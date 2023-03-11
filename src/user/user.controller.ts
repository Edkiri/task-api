import { Body, Controller, Post } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/decorators';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getUser(@Req() req: Request) {
    const user = req.user as User;
    return this.userService.findOneOrFail(user.id);
  }
}
