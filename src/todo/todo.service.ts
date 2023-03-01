import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/list/entities/list.entity';
import { ListService } from 'src/list/services/list.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepo: Repository<Todo>,
    private readonly listService: ListService,
  ) {}

  async find() {
    return this.todosRepo.find({ relations: { list: true } });
  }

  async findOne(id: number) {
    const todo = await this.todosRepo.findOne({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return todo;
  }

  async create(data: CreateTodoDto) {
    const newTodo = this.todosRepo.create(data);
    let list: List;
    if (data.listId) {
      list = await this.listService.findOne(data.listId);
    }
    newTodo.list = list;
    const todo = await this.todosRepo.save(newTodo);
    return todo;
  }

  async updateOne(id: number, data: UpdateTodoDto) {
    const oldTodo = await this.findOne(id);
    let list: List;
    if (data.listId) {
      list = await this.listService.findOne(data.listId);
    }
    oldTodo.list = list;
    this.todosRepo.merge(oldTodo, data);

    const todo = await this.todosRepo.save(oldTodo);
    return todo;
  }

  async delete(id: number) {
    const todoToDelete = await this.findOne(id);
    await this.todosRepo.remove(todoToDelete);
    return {
      message: `Todo with id ${id} has been deleted`,
      statusCode: 204,
    };
  }
}
