import Joi from 'joi';

export const LoginSchema = Joi.object({
  username: Joi.string().alphanum().lowercase().min(3).max(32).required(),
  password: Joi.string().min(8).max(256).trim().required(),
});
