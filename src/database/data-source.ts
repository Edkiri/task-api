import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Todo } from 'src/todo/entities/todo.entity';
import { List } from 'src/list/entities/list.entity';
import { init1677603072108 } from './migrations/1677603072108-init';

dotenv.config({
  path: '.env',
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Todo, List],
  migrations: [init1677603072108],
  synchronize: false,
  logging: false,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : null,
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export default dataSource;
