import * as Joi from 'joi';

export const serverValidationSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
  secure: Joi.boolean().required(),
});
