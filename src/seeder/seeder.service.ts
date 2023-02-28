import { Injectable } from '@nestjs/common';
import { ListSeederService } from './list-seeder/list-seeder.service';

@Injectable()
export class SeederService {
  constructor(private readonly listSeederService: ListSeederService) {}

  async seed() {
    await this.lists()
      .then((completed) => {
        console.log();
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log('Failing creating default list');
        Promise.reject(error);
      });
  }

  async lists() {
    return await Promise.all(this.listSeederService.create())
      .then((createdLists) => {
        if (!createdLists.some((item) => !item)) {
          console.log(`${createdLists.length} lists has been created`);
        }
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
