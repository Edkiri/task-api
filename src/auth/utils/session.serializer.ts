import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: any, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err: any, user: User) => void) {
    const userDB = await this.authService.findUser(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
