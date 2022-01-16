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


export { router as LobbyController };
