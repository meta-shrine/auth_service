import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { VerifyOtp } from 'src/users/dto/verify-otp.input';
import { UserStatusEnum } from 'src/users/enum/user-type.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './entity/token.entity';
import { Model } from 'mongoose';
import { toMongoId } from 'src/helper/mongodb.helper';
import { generateJti } from 'src/helper/jti.helper';
import { ForgetPasswordInput } from './dto/forget-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { generateNumber } from 'src/helper/generateNumber';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne(email);

      if (user) {
        if (await bcrypt.compare(password, user[0].password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: User) {
    try {
      user.password = null;
      const accessJti = generateJti();
      const access_token = `Bearer ${this.jwtService.sign(
        { ...user, jti: accessJti },
        { secret: process.env.JWT_SECRET_KEY, expiresIn: '4h' },
      )}`;
      const refreshJti = generateJti();
      const refresh_token = this.jwtService.sign(
        { ...user, jti: refreshJti },
        { secret: process.env.JWT_SECRET_KEY, expiresIn: '7d' },
      );
      const tokenPayload = {
        userId: user._id,
        access_token: accessJti,
        refresh_token: refreshJti,
      };
      await this.tokenModel.create(tokenPayload);
      return {
        access_token,
        refresh_token,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async register(user: CreateUserInput): Promise<User | Error> {
    return await this.userService.create(user);
  }

  async verifyOtp(input: VerifyOtp) {
    const { email, otp } = input;
    const isOtpVerified = await this.userService.verifyOtpCode(email, otp);
    if (isOtpVerified) {
      // Todo: Need to do it in clean way
      const userData = await this.userService.findOne(email);
      await this.userService.update(userData._id, {
        id: userData._id,
        isEmailVerified: UserStatusEnum.VERIFIFED,
      });
    }
    return isOtpVerified;
  }

  async refresh(refresh_token) {
    if (!refresh_token)
      throw new BadRequestException(
        'Refresh token is required please provide refresh token',
      );
    const decode = await this.jwtService.decode(refresh_token);
    if (!decode) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async forgetPassword(forgetPasswordInput: ForgetPasswordInput) {
    const { email, password, new_password } = forgetPasswordInput;

    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException('User does not exist !!!');
    if (password !== new_password)
      throw new NotFoundException('Please enter same password');
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    delete user.password;
    return user;
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    const { email } = resetPasswordInput;
    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException('User does not exist !!!');

    //TODO: Need to send email for reset password
  }
}
