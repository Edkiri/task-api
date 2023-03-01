import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/list/entities/list.entity';
import slugify from 'src/utils/slugify';
import { Repository } from 'typeorm';

@Injectable()
export class ListSeederService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
  ) {}

  create(): Array<Promise<List>> {
    const defaultListTitles = ['Goals App', 'Legalizacion España'];
    return defaultListTitles.map(async (listTitle: string) => {
      return await this.listRepo
        .findOne({ where: { title: listTitle } })
        .then(async (dbList) => {
          if (dbList) {
            return Promise.resolve(null);
          }
          const newList = this.listRepo.create({
            title: listTitle,
            slugName: slugify(listTitle),
          });
          return this.listRepo.save(newList);
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
