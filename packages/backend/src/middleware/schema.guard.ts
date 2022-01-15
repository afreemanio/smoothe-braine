import Joi from 'joi';
import { ParameterizedContext } from 'koa';
import _ from 'lodash';

import { StatusCodes } from '@libs/shared';

export const SchemaGuard = (Schema: Joi.ObjectSchema) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const body = _.isEmpty(ctx.request.body) ? ctx.request.query : ctx.request.body;
    const { value, error } = Schema.validate(body, {
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
      ctx.data = value;
      await next();
    }
  };
};
