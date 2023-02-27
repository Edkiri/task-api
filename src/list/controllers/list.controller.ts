import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { ListService } from '../services/list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll() {
    return this.listService.find();
  }

  @Post()
  createList(@Body() data: CreateListDto) {
    return this.listService.create(data);
  }

  @Put(':listId')
  updateTodo(
    @Param('listId', ParseIntPipe) listId: number,
    @Body() data: UpdateListDto,
  ) {
    return this.listService.updateOne(listId, data);
  }

  @Delete('/:listId')
  deleteTodo(@Param('listId', ParseIntPipe) listId: number) {
    return this.listService.delete(listId);
  }
}
