import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import config from 'src/config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      clientID: configService.googleClient.id,
      clientSecret: configService.googleClient.secret,
      callbackURL: configService.googleClient.redirectUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(access_token: string, refreshToken: string, profile: Profile) {
    console.log(access_token, refreshToken);
    console.log('Profile', profile);
  }
}
