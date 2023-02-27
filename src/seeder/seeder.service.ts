import { Injectable } from '@nestjs/common';
import { ListSeederService } from './list-seeder/list-seeder.service';

@Injectable()
export class SeederService {
  constructor(private readonly listSeederService: ListSeederService) {}

  async seed() {
    await this.listSeederService
      .createDefaultList()
      .then((completed) => {
        if (completed) console.log('Default list has been created');
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log('Failing creating default list');
        Promise.reject(error);
      });
  }
}
