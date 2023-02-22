import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Todo } from 'src/todo/entities/todo.entity';
import { init1677054948003 } from './migrations/1677054948003-init';

dotenv.config({
  path: '.env',
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Todo],
  migrations: [init1677054948003],
  synchronize: false,
  logging: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : null,
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export default dataSource;
