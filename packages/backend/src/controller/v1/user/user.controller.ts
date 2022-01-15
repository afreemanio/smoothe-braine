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
import { JWTGuard, ParamGuard, SchemaGuard } from '@backend/middleware';

import { UserHelper } from '.';

const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

/**
 * create a new user
 */
router.post('/', SchemaGuard(CreateUserSchema), async (ctx: ParameterizedContext) => {
  const data: UserValues = ctx.data;

  const user = await UserHelper.findByEmailOrUsername({
    username: data.username,
    email: data.email,
  });
  if (!_.isEmpty(user)) ctx.throw(CLIENT_ERROR.CONFILCT.status, 'user already exists');

  const result = await UserHelper.create(data);

  if (result) {
    ctx.status = SUCCESS.OK.status;
    ctx.body = result;
  } else {
    ctx.throw(SERVER_ERROR.INTERNAL.status, SERVER_ERROR.INTERNAL.message);
  }
}); // {post} /user

/**
 * get user account
 */
router.get('/me', JWTGuard(), RoleGuard([UserRoleType.USER]), async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await UserHelper.findById((ctx.state as any).userId);
  if (_.isEmpty(user)) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, 'user does not exist');

  ctx.body = user;
}); // {get} /user/me

/**
 * get all users
 */
router.get(
  '/',
  JWTGuard(),
  RoleGuard([UserRoleType.ADMIN]),
  ParamGuard(SearchSchema),
  async (ctx: ParameterizedContext) => {
    const users = await UserHelper.findAll(ctx.params);
    ctx.body = users;
  },
); // {get} /user/

/**
 * get a user by id
 */
router.get(
  '/:id',
  JWTGuard(),
  RoleGuard([UserRoleType.USER]),
  ParamGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const { id } = ctx.params;

    const user = await UserHelper.findById(id);
    if (_.isEmpty(user)) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, 'user does not exist');

    ctx.body = user;
  },
); // {get} /user/:id

/**
 * activate a user
 */
router.post(
  '/:id',
  JWTGuard(),
  RoleGuard([UserRoleType.MODERATOR]),
  ParamGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const { id } = ctx.params;

    const user = await UserHelper.findById(id);

    if (_.isEmpty(user)) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, 'user does not exist');

    ctx.body = await UserHelper.activate(id);
  },
); // {post} /user/:id

/**
 * deactivate a user
 */
router.delete(
  '/:id',
  JWTGuard(),
  RoleGuard([UserRoleType.MODERATOR]),
  ParamGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const { id } = ctx.params;

    const user = await UserHelper.findById(id);

    if (_.isEmpty(user)) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, 'user does not exist');

    ctx.body = await UserHelper.deactivate(id);
  },
); // {delete} /user/:id

/**
 * add a role to a user
 */
router.post(
  '/:id/:roleId',
  JWTGuard(),
  RoleGuard([UserRoleType.ADMIN]),
  ParamGuard(RoleSchema),
  async (ctx: ParameterizedContext) => {
    const role: RoleValues = ctx.param;

    const user = await UserHelper.findById(role.id);

    if (_.isEmpty(user)) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, 'user does not exist');
    if (await UserHelper.hasRole(role.id, role.roleId))
      ctx.throw(CLIENT_ERROR.CONFILCT.status, `user already has role ${role.roleId}`);

    if (await UserHelper.addRole(role.id, role.roleId)) {
      ctx.status = SUCCESS.OK.status;
      ctx.body = SUCCESS.OK.message;
    } else {
      ctx.status = SERVER_ERROR.INTERNAL.status;
      ctx.body = SERVER_ERROR.INTERNAL.message;
    }
  },
); // {post} /user/:id/role

/**
 * delete a role from a user
 */
router.delete(
  '/:id/:role',
  JWTGuard(),
  RoleGuard([UserRoleType.ADMIN]),
  ParamGuard(RoleSchema),
  async (ctx: ParameterizedContext) => {
    const role: RoleValues = ctx.param;

    const user = await UserHelper.findById(role.id);

    if (_.isEmpty(user)) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, 'user does not exist');
    if (!(await UserHelper.hasRole(role.id, role.roleId)))
      ctx.throw(CLIENT_ERROR.NOT_FOUND.status, `user does not have role ${role.roleId}`);

    if (await UserHelper.deleteRole(role.id, role.roleId)) {
      ctx.status = SUCCESS.OK.status;
      ctx.body = SUCCESS.OK.message;
    } else {
      ctx.status = SERVER_ERROR.INTERNAL.status;
      ctx.body = SERVER_ERROR.INTERNAL.message;
    }
  },
); // {post} /user/:id/role

export { router as UserController };
