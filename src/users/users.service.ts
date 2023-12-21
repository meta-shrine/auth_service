import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from './entities/otpRequest.entity';
import { generateNumber } from 'src/helper/generateNumber';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
  ) { }

  async create(createUserInput: CreateUserInput) {
    try {
      const checkUser = await this.userModel.find({
        email: createUserInput.email,
      });
      if (checkUser.length > 0) {
        return new Error('User Already exists');
      }

      const saltOrRounds = 10;
      const password = await bcrypt.hash(
        createUserInput.password,
        saltOrRounds,
      );

      createUserInput.password = password;

      const createUser = new this.userModel(createUserInput);
      const user = await createUser.save();
      // Creating expires at 2 min
      const expiresBy = Math.pow(2, 1) * 60 * 1000;
      const expiresAt = new Date(new Date().getTime() + expiresBy);

      await this.otpModel.create({
        email: createUserInput.email,
        otp: generateNumber(4),
        expiresAt,
      });
      return user;

      //TODO: need to send email with otp for email verification
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserInput, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }

  async verifyOtpCode(email: string, otp: string): Promise<boolean> {
    const getCodeRequest = await this.otpModel.findOne({
      email,
      otp,
      expiresAt: { $gte: new Date() },
    });
    return !!getCodeRequest;
  }
}
