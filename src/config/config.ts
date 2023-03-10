import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    secret: process.env.SECRET,
    postgresUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    env: process.env.ENVIROMENT || 'development',
    googleClient: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: process.env.GOOGLE_CLIENT_REDIRECT_URL,
    },
  };
});
