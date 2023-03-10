import * as Joi from 'joi';

const configSchema = Joi.object({
  SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_USERNAME: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_REDIRECT_URL: Joi.string().required(),
});

export default configSchema;
