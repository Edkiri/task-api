import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  ParseIntPipe,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { IsTodoOwner } from './guards/is-todo-owner.guard';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthenticatedGuard)
export class TodosController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.todosService.findUserTodos(user.id);
  }

  @Post()
  createTodo(@Body() data: CreateTodoDto, @Req() req: Request) {
    const user = req.user as User;
    return this.todosService.create(user.id, data);
  }

  @UseGuards(IsTodoOwner)
  @Put(':todoId')
  updateTodo(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() data: UpdateTodoDto,
  ) {
    return this.todosService.updateOne(todoId, data);
  }

  @UseGuards(IsTodoOwner)
  @Delete('/:todoId')
  deleteTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.todosService.delete(todoId);
  }
}
