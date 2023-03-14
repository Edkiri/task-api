import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Session as SessionDecorator,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Session } from 'express-session';
import { AuthService } from './auth.service';
import { Inject } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(@Req() req: Request) {
    console.log('Google login from google auth');
    console.log(req);
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect(process.env.FRONTEND_HOST, 301)
  handleRedirect(@Req() req: Request) {
    console.log('Redirect from google auth');
    console.log(req.session.cookie);
    return;
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@SessionDecorator() session: Session) {
    return this.authService.logout(session);
  }
}
