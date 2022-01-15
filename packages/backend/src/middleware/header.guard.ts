import Joi from 'joi';
import { ParameterizedContext } from 'koa';

import { StatusCodes } from '@libs/shared';

export const HeaderGuard = (Schema: Joi.ObjectSchema) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const body = ctx.headers;
    const { value, error } = Schema.validate(body, {
      allowUnknown: true,
      abortEarly: false,
      errors: { escapeHtml: true },
    });
    if (error) {
      ctx.status = StatusCodes.CLIENT_ERROR.BAD_REQUEST.status;
      ctx.body = [];
      error.details.forEach((e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ctx.body as string[]).push(e.message.replace(/"/g, ''));
      });
      return;
    } else {
      ctx.headerData = value;
      await next();
    }
  };
};
