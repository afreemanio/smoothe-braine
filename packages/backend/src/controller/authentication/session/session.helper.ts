import { omit } from 'lodash';
import { v4 as uuid } from 'uuid';

import { LoginValues } from '@libs/shared';
import { compare } from '@libs/utility';
import { db } from '@libs/database';

const login = async ({ username, password }: LoginValues) => {
  const user = await db.user.findFirst({
    where: { username },
    include: {
      roles: {
        select: {
          roleId: true,
        },
      },
    },
  });
  if (user && (await compare(password, user.password))) {
    const session = await createSession(user.userId);
    if (session) {
      (user.roles as unknown as string[]) = user.roles.map((role) => role.roleId);
      return {
        ...omit(user, ['password', 'deleted']),
        session: omit(session, ['userId', 'revoked']),
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const createSession = async (userId: string) => {
  return db.session.create({
    data: {
      sessionId: uuid(),
      userId,
      // NOTE: 30 days from creation
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
    },
  });
};

export const SessionHelper = {
  login,
};
