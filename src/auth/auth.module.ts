import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionEntity } from './entities/session.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    PassportModule.register({
      session: true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
