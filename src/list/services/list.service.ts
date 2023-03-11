import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
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
    private readonly userService: UserService,
  ) {}

  async find(userId: number) {
    return this.listRepo.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number) {
    const list = await this.listRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!list) {
      throw new NotFoundException(`List with id #${id} not found`);
    }
    return list;
  }

  async findOneBySlugName(slugName: string): Promise<List> | undefined {
    const list = await this.listRepo.findOne({
      where: { slugName },
    });
    return list;
  }

  async create(userId: number, data: CreateListDto) {
    const slugName = slugify(data.title);
    const oldList = await this.findOneBySlugName(slugName);
    if (oldList)
      throw new BadRequestException(
        `A list with slug '${slugName}' already exists'`,
      );
    const user = await this.userService.findOneOrFail(userId);
    const newList = this.listRepo.create({ ...data, slugName });
    newList.user = user;
    const list = await this.listRepo.save(newList);
    return list;
  }

  async updateOne(id: number, data: UpdateListDto) {
    const oldList = await this.findOne(id);
    if (data.title) {
      const slugName = slugify(data.title);
      const oldList = await this.findOneBySlugName(slugName);
      if (oldList)
        throw new BadRequestException(
          `A list with slug '${slugName}' already exists'`,
        );
      data['slugName'] = slugName;
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
