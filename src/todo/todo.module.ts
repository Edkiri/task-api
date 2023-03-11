import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from './entities/todo.entity';
import { TodosController } from './todo.controller';
import { TodoService } from './todo.service';
import { ListModule } from 'src/list/list.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), ListModule, UserModule],
  controllers: [TodosController],
  providers: [TodoService],
  exports: [],
})
export class TodosModule {}
