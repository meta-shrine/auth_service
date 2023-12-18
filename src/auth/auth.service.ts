import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne(email);

      if (user.length > 0) {
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
      return {
        access_token: `Bearer ${this.jwtService.sign(
          { user },
          { secret: process.env.JWT_SECRET_KEY },
        )}`,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
