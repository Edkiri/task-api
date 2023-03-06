import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Todo } from 'src/todo/entities/todo.entity';
import { List } from 'src/list/entities/list.entity';
import { migrations1678122770715 } from './migrations/1678122770715-migrations';

dotenv.config({
  path: '.env',
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Todo, List],
  migrations: [migrations1678122770715],
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
