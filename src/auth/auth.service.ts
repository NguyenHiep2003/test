import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser({ email, password }) {
    try {
      const user = await this.userService.getUser({ email });
      if (!user) return null;
      const checkPassword = await this.userService.checkPassword(
        password,
        user.hashedPassword,
      );
      if (!checkPassword) return null;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async generateToken(_id: string): Promise<string> {
    try {
      const payload = { _id };
      const token = await this.jwtService.signAsync(payload);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
