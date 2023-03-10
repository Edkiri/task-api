import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUserOauth(userData) {
    const user = await this.userService.findByEmail(userData.email);
    if (user) return user;
    const newUser = await this.userService.create(userData);
    return newUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async findUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
