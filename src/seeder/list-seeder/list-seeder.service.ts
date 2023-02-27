import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/list/entities/list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListSeederService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
  ) {}

  async createDefaultList(): Promise<List> | null {
    const oldList = await this.listRepo.findOne({
      where: { slug_name: 'my-day' },
    });
    if (oldList) return;
    const defaultList = this.listRepo.create({
      title: 'My Day',
      slug_name: 'my-day',
    });
    return this.listRepo.save(defaultList);
  }
}
