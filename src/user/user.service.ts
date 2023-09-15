import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(dataForCreateUser: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(dataForCreateUser);
      return user.save();
    } catch (error) {
      throw error;
    }
  }
  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }
  async getUser(filter: FilterQuery<User>) {
    try {
      return await this.userModel.findOne(filter).exec();
    } catch (error) {
      throw error;
    }
  }
  async getAllUser(): Promise<User[]> {
    try {
      return await this.userModel.find(
        {},
        { firstName: 1, lastName: 1, username: 1, email: 1 },
      );
    } catch (error) {
      throw error;
    }
  }
  async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
  async updateInfoUser(_id: string, field: FilterQuery<User>) {
    try {
      return await this.userModel.findOneAndUpdate({ _id }, field);
    } catch (error) {
      throw error;
    }
  }
}
