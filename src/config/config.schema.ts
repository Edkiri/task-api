import * as Joi from 'joi';

const configSchema = Joi.object({
  FRONTEND_HOST: Joi.string().required(),
  SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_REDIRECT_URL: Joi.string().required(),
});

export default configSchema;
