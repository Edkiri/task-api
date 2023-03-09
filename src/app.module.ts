import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import configSchema from './config/config.schema';
import { dataSourceOptions } from './database/data-source';
import { environments } from './enviroments';
import { TodosModule } from './todo/todo.module';
import { ListModule } from './list/list.module';
import { SeederModule } from './seeder/seeder.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TodosModule,
    ListModule,
    SeederModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
