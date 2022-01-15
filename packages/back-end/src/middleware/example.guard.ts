import { ParameterizedContext } from 'koa';

export const HeaderGuard = () => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    await next();
  };
};
