import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { IsListOwner } from '../guards/is-list-owner.guard';
import { ListService } from '../services/list.service';

@Controller('list')
@UseGuards(AuthenticatedGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.listService.find(user.id);
  }

  @Post()
  createList(@Req() req: Request, @Body() data: CreateListDto) {
    const user = req.user as User;
    return this.listService.create(user.id, data);
  }

  @UseGuards(IsListOwner)
  @Put(':listId')
  updateTodo(
    @Param('listId', ParseIntPipe) listId: number,
    @Body() data: UpdateListDto,
  ) {
    return this.listService.updateOne(listId, data);
  }

  @UseGuards(IsListOwner)
  @Delete('/:listId')
  deleteTodo(@Param('listId', ParseIntPipe) listId: number) {
    return this.listService.delete(listId);
  }
}
