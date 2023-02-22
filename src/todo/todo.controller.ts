import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todo.service';

@Controller('todos')
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
}
