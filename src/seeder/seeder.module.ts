import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/config';
import configSchema from 'src/config/config.schema';
import { dataSourceOptions } from 'src/database/data-source';
import { environments } from 'src/enviroments';
import { ListSeederModule } from './list-seeder/list-seeder.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ListSeederModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
