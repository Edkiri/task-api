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
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodosService } from './todo.service';

@Controller('todos')
@UseGuards(AuthenticatedGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.find();
  }

  @Post()
  createTodo(@Body() data: CreateTodoDto) {
    return this.todosService.create(data);
  }

  @Put(':todoId')
  updateTodo(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() data: UpdateTodoDto,
  ) {
    return this.todosService.updateOne(todoId, data);
  }

  @Delete('/:todoId')
  deleteTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.todosService.delete(todoId);
  }
}
