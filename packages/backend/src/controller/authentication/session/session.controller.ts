import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { CLIENT_ERROR, LoginSchema, LoginValues, SUCCESS } from '@libs/shared';

import { SchemaGuard } from '@backend/middleware';

import { SessionHelper } from '.';
import { UserHelper } from '../../v1/user';

const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

router.post('/login', SchemaGuard(LoginSchema), async (ctx: ParameterizedContext) => {
  const data: LoginValues = ctx.data;

  const user = await UserHelper.findByUsername(data.username);
  if (_.isEmpty(user))
    ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);

  const result = await SessionHelper.login(data);
  if (result) {
    ctx.status = SUCCESS.OK.status;
    ctx.body = result;
  } else {
    ctx.status = CLIENT_ERROR.UNAUTHORIZED.status;
    ctx.body = CLIENT_ERROR.UNAUTHORIZED.message;
  }
}); // {post} /login

export { router as SessionController };
