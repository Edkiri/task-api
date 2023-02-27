import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/list/entities/list.entity';
import { ListSeederService } from './list-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListSeederService],
  exports: [ListSeederService],
})
export class ListSeederModule {}
