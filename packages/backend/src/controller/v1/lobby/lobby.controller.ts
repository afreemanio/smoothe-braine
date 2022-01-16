import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { RoleGuard } from '@backend/middleware/role.guard';
import {
  CLIENT_ERROR,
  CreateUserSchema,
  IdSchema,
  RoleSchema,
  RoleValues,
  SERVER_ERROR,
  SUCCESS,
  SearchSchema,
  UserRoleType,
  UserValues,
} from '@libs/shared';
import { ParamGuard, SchemaGuard } from '@backend/middleware';
import { LobbyHelper } from '.';
import { SessionGuard } from '@backend/middleware/session.guard';

// import { UserHelper } from '.';

const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

/**
 * Testing value!
 */
router.get('/', async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx.body = 'Hello World';

}); // {get} /user/me

router.post('/', SessionGuard(), RoleGuard([UserRoleType.USER]), async (ctx: ParameterizedContext) => {
// router.post('/', async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myUserId: string = (ctx.state as any).userId;

  const result = await LobbyHelper.create(myUserId);

  ctx.body = result;
}); // {get} /user/me




export { router as LobbyController };
