import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionEntity } from './auth/entities/session.entity';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.set('trust proxy', 'loopback');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({ origin: [process.env.FRONTEND_HOST], credentials: true });

  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);

  app.use(
    session({
      name: 'task-cookie',
      secret: process.env.SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1209600000,
        secure: true,
        httpOnly: false,
      },
      store: new TypeormStore({
        cleanupLimit: 10,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
