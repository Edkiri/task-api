import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from './entities/todo.entity';
import { TodosController } from './todo.controller';
import { TodosService } from './todo.service';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), ListModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [],
})
export class TodosModule {}
