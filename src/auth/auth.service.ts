import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { GoogleProfileType } from './types/google-profile';
import { Session } from 'express-session';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUserOauth(userData: GoogleProfileType) {
    const user = await this.userService.findByEmail(userData.email);
    if (user) {
      if (user.avatarUrl !== userData.avatarUrl) {
        const updatedUser = await this.userService.update(user.id, {
          avatarUrl: userData.avatarUrl,
        });
        return updatedUser;
      }
      return user;
    }
    const newUser = await this.userService.createUserFromGoogle(
      userData.email,
      userData.displayName,
      userData.avatarUrl,
    );
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

  logout(session: Session) {
    session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    return {
      message: 'Logout succesfull',
      status: 200,
    };
  }
}
