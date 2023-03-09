import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userData: CreateUserDto) {
    const user = await this.userService.findByEmail(userData.email);
    if (user) return user;
    const newUser = await this.userService.create(userData);
    return newUser;
  }

  async findUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
