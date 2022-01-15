import Joi from 'joi';

export const UserSchema = Joi.object({
  email: Joi.string().max(32).email().required(),

  username: Joi.string().min(3).max(32).alphanum().lowercase().required(),

  password: Joi.string().min(8).max(256).trim().required(),
});

// TODO: implement me
export const CreateUserSchema = Joi.object({
  email: Joi.string().max(32).email().required(),

  username: Joi.string().min(3).max(32).alphanum().lowercase().required(),

  password: Joi.string().min(8).max(256).trim().required(),

  confirmPassword: Joi.string()
    .label('Password confirmation')
    .min(8)
    .max(256)
    .trim()
    .valid(Joi.ref('password'))
    .options({ messages: { 'any.only': '{{#label}} does not match' } })
    .required(),
});

export const UserIdSchema = Joi.object({
  username: Joi.string().min(3).max(32).alphanum().lowercase().required(),
});
