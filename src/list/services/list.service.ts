import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'src/utils/slugify';
import { Repository } from 'typeorm';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { List } from '../entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
  ) {}

  async find() {
    return this.listRepo.find();
  }

  async findOne(id: number) {
    const list = await this.listRepo.findOne({
      where: { id },
    });
    if (!list) {
      throw new NotFoundException(`List with id #${id} not found`);
    }
    return list;
  }

  async findOneBySlugName(slug_name: string): Promise<List> | undefined {
    const list = await this.listRepo.findOne({
      where: { slug_name },
    });
    return list;
  }

  async create(data: CreateListDto) {
    const slug_name = slugify(data.title);
    const oldList = await this.findOneBySlugName(slug_name);
    if (oldList)
      throw new BadRequestException(
        `A list with slug '${slug_name}' already exists'`,
      );
    data['slug_name'] = slug_name;
    const newList = this.listRepo.create(data);
    const list = await this.listRepo.save(newList);
    return list;
  }

  async updateOne(id: number, data: UpdateListDto) {
    const oldList = await this.findOne(id);
    if (data.title) {
      const slug_name = slugify(data.title);
      const oldList = await this.findOneBySlugName(slug_name);
      if (oldList)
        throw new BadRequestException(
          `A list with slug '${slug_name}' already exists'`,
        );
      data['slug_name'] = slug_name;
    }
    this.listRepo.merge(oldList, data);
    const list = await this.listRepo.save(oldList);
    return list;
  }

  async delete(id: number) {
    const listToDelete = await this.findOne(id);
    await this.listRepo.remove(listToDelete);
    return {
      message: `List with id ${id} has been deleted`,
      statusCode: 204,
    };
  }
}
