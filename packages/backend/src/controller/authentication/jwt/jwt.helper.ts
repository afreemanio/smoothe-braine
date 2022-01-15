import jwt from 'jsonwebtoken';

import { LoginValues } from '@libs/shared';
import { compare } from '@libs/utility';
import { db } from '@libs/database';

import config from '../../../../../../libs/config/src/server.config';

const login = async ({ username, password }: LoginValues) => {
  const user = await db.user.findFirst({
    where: { username },
    include: {
      roles: {
        select: {
          role: {
            select: { roleId: true, authority: true },
          },
        },
      },
    },
  });
  if (user && (await compare(password, user.password))) {
    // (user.roles as unknown as string[]) = user.roles.map((role) => role.roleId);
    const roles = user.roles.map(({ role }) => role.roleId);
    const created = new Date().getTime();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 5).getTime();
    const authorization = {
      userId: user.userId,
      iat: created,
      exp: expires,
      roles,
    };
    const token = await signToken(authorization);
    return {
      token,
      state: authorization,
    };
  } else {
    return null;
  }
};

const signToken = async (payload) => {
  const token = jwt.sign(payload, config.JWT_SECRET);
  return token;
};

const verifyToken = async (token: string) => {
  const payload = jwt.verify(token, config.JWT_SECRET);
  return payload;
};

export const JWTHelper = {
  login,
  signToken,
  verifyToken,
};
