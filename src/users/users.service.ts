import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

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
      return createUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(email: string) {
    return await this.userModel.find({ email });
  }

  async getAuditors(): Promise<User[]> {
    return await this.userModel.find({ role: 'auditor' });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserInput, {
      new: true,
      upsert: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
