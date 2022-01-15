import { ParameterizedContext } from 'koa';

import { CLIENT_ERROR } from '@libs/shared';
import { db } from '@libs/database';

export const SessionGuard = (options?: { passthrough?: boolean }) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authorization_key = ctx.headers.authorization ?? (ctx.session as any).sessionId;

    if (authorization_key && authorization_key.length > 0) {
      const sessionId = authorization_key.split(' ')[1] ?? '';

      if (sessionId) {
        const session = await db.session.findFirst({
          where: {
            sessionId,
          },
        });
        if (session) {
          // NOTE: session is not expired
          if (session.created < session.expires) {
            const user = await db.user.findFirst({
              where: {
                userId: session.userId,
              },
              include: {
                roles: {
                  select: {
                    roleId: true,
                  },
                },
              },
            });
            // NOTE: user has not bee nmodified since the session was created
            if (user) {
              if (user.updated < session.created) {
                (user.roles as unknown as string[]) = user.roles.map((role) => role.roleId);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ctx.session as any).user = user;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ctx.session as any).session = session;
                return await next();
              } else {
                await db.session.update({
                  where: {
                    sessionId: session.sessionId,
                  },
                  data: {
                    revoked: true,
                  },
                });
              }
            }
          } else {
            await db.session.update({
              where: {
                sessionId: session.sessionId,
              },
              data: {
                revoked: true,
              },
            });
          }
        }
      }
    }

    if (options?.passthrough) return await next();
    else ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
  };
};
// TODO
