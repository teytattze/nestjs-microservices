import * as Joi from 'joi';

export const serverValidationSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
  secure: Joi.boolean().required(),
});

const jwtValidationSchema = Joi.object({
  alg: Joi.string().valid('RS256').required(),
  ttl: Joi.number().required(),
  filename: Joi.string().required(),
});
