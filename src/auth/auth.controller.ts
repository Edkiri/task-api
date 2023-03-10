import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return {
      message: 'Google login',
    };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return {
      message: 'OK',
    };
  }
}
