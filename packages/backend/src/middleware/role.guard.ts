import { ParameterizedContext } from 'koa';
import _ from 'lodash';

import { CLIENT_ERROR, RoleType, UserRoleType } from '@libs/shared';

const NO_AUTHORITY = 1000;

export const RoleGuard = (roles: RoleType[], options?: { passthrough: boolean }) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    // const userRoles = await db.userRole.findMany({
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   where: { userId: (ctx.session as any).user.userId },
    //   include: { role: true },
    // });
    const userRoles = ctx.state.roles;

    // FIXME: overengineered lol, but it works
    // NOTE: Reduce to highest authority (lowest number)
    const authority = userRoles
      ? userRoles.reduce((acc, userRole) => {
          if (userRole === UserRoleType.DISABLED.roleId)
            return ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
          return roles.reduce((acc, role) => {
            return UserRoleType[_.upperCase(userRole)].authority <= role.authority
              ? UserRoleType[_.upperCase(userRole)].authority
              : acc;
          }, 1000) < acc
            ? UserRoleType[_.upperCase(userRole)].authority
            : acc;
        }, 1000)
      : NO_AUTHORITY;
    ctx.state.authority = authority;
    if (options?.passthrough) {
      return await next();
    } else {
      if (authority < NO_AUTHORITY) return await next();
      else return ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
    }
  };
};
