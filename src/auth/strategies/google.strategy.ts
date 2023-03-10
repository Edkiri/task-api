import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import config from 'src/config/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('AUTH_SERVICE') private authService: AuthService,
  ) {
    super({
      clientID: configService.googleClient.id,
      clientSecret: configService.googleClient.secret,
      callbackURL: configService.googleClient.redirectUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(access_token: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUserOauth({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    return user || null;
  }
}
