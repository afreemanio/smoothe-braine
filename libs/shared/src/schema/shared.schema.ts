import Joi from 'joi';

export const IdSchema = Joi.object({
  id: Joi.string().min(16).max(16).alphanum().lowercase().required(),
});

export const SearchSchema = Joi.object({
  page: Joi.number().min(1).default(0),
  take: Joi.number().min(1).default(20),
});
