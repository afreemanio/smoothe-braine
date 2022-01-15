import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { uid } from 'uid/secure';

import { UserRoleType } from '@libs/shared';
import { genHash } from '@libs/utility';
import { connectDB, db } from '@libs/database';

import config from '../libs/config/src/server.config';

(async () => {
  await connectDB();
  const roleData: Prisma.RoleCreateInput[] = _.map(UserRoleType, (r) => r);

  const seed_password = await genHash(config.ADMIN_PASS);

  const admin: Prisma.UserCreateInput = {
    userId: uid(16),
    email: config.ADMIN_EMAIL,
    username: config.ADMIN_USER,
    password: await genHash(config.ADMIN_PASS),
  };

  const userData: Prisma.UserCreateInput[] = [
    ..._.times(10, () => ({
      userId: uid(16),
      email: `${uid(6)}@example.com`,
      username: `${uid(8)}`,
      password: seed_password,
    })),
  ];

  console.log('/**************** seeding ****************/');

  console.log('\n---- role ----');
  /************* ROLE *************/
  for (const r of roleData) {
    const role = await db.role.create({
      data: r,
    });
    console.log(`created role: ${role.roleId}`);
  }

  console.log('\n---- user ----');
  /************* USER *************/
  const user = await db.user.create({
    data: {
      ...admin,
      roles: {
        create: [
          { roleId: UserRoleType.DEVELOPER.roleId },
          { roleId: UserRoleType.ADMIN.roleId },
          { roleId: UserRoleType.USER.roleId },
        ],
      },
    },
  });
  console.log(`created user:#${user.userId}\n${user.email}\n${user.password}\n`);

  for (const u of userData) {
    const user = await db.user.create({
      data: {
        ...u,
        roles: {
          create: [{ roleId: UserRoleType.USER.roleId }],
        },
      },
    });
    console.log(`created user:#${user.userId}\n${user.email}\n${user.password}\n`);
  }
})();
