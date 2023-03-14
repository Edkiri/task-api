import {
  Controller,
  Get,
  Post,
  Req,
  Session as SessionDecorator,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Session } from 'express-session';
import { AuthService } from './auth.service';
import { Inject, Res } from '@nestjs/common/decorators';

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
    return req.user;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Res() res: Response) {
    return res.redirect(301, process.env.FRONTEND_HOST);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@SessionDecorator() session: Session) {
    return this.authService.logout(session);
  }
}
