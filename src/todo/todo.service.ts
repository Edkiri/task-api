import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/list/entities/list.entity';
import { ListService } from 'src/list/services/list.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepo: Repository<Todo>,
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  async findUserTodos(userId: number) {
    return this.todosRepo.find({
      where: { user: { id: userId } },
      relations: { list: true },
    });
  }

  async findOneOrFail(id: number) {
    const todo = await this.todosRepo.findOne({
      where: { id },
      relations: { list: true, user: true },
    });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return todo;
  }

  async create(userId: number, data: CreateTodoDto) {
    const newTodo = this.todosRepo.create(data);
    const user = await this.userService.findOneOrFail(userId);
    newTodo.user = user;
    let list: List;
    if (data.listId) {
      list = await this.listService.findOne(data.listId);
    }
    newTodo.list = list;
    const todo = await this.todosRepo.save(newTodo);
    return todo;
  }

  async updateOne(id: number, data: UpdateTodoDto) {
    const oldTodo = await this.findOneOrFail(id);
    this.todosRepo.merge(oldTodo, data);
    return this.todosRepo.save(oldTodo);
  }

  async delete(id: number) {
    const todoToDelete = await this.findOneOrFail(id);
    await this.todosRepo.remove(todoToDelete);
    return {
      message: `Todo with id ${id} has been deleted`,
      statusCode: 204,
    };
  }
}
