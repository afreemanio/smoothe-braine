import { omit } from 'lodash';
import { uid } from 'uid/secure';

import { UserValues } from '@libs/shared';
import { db } from '@libs/database';
import { genHash } from '@libs/utility';
import { DateTime } from 'luxon';

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * create a new lobby
 * @param userId id of user that will be the host of the new lobby
 * @returns database result
 */
const create = async (userId: string) => {
  const currentDateTime = DateTime.now().plus({ minutes: 15 });

  const uniqueId = makeid(6);

  const result = await db.lobby.create({
    data: {
      lobbyPublicCode: uniqueId,
      expires: currentDateTime.toJSDate(),
      host: {
        connect: {
          userId: userId,
        },
      },
    },
  });
  return result;
};

/**
 * patch a user
 * @param userId user to patch
 * @param payload user data patch to apply
 * @returns database result
 */
const patch = async (userId: string, payload: Omit<Partial<UserValues>, 'email'>) => {
  const result = await db.user.update({
    where: { userId },
    data: payload,
  });
  return omit(result, ['password', 'deleted']);
};

/**
 * activate a user
 * @param userId id of user to activate
 * @returns database result
 */
export const activate = async (userId: string) => {
  const result = await db.user.update({ where: { userId }, data: { deleted: null } });
  return omit(result, ['password']);
};

/**
 * deactivate a user
 * @param userId id of user to deactivate
 * @returns database result
 */
export const deactivate = async (userId: string) => {
  const result = await db.user.update({ where: { userId }, data: { deleted: new Date() } });
  return omit(result, ['password']);
};

/**
 * add a role to a user
 * @param userId id of user to modify
 * @param roleId name of role to add to user
 * @returns database result
 */
export const addRole = async (userId: string, roleId: string) => {
  return db.userRole.createMany({ data: { userId, roleId } });
};

/**
 * delete a role from a user
 * @param userId id of user to modify
 * @param roleId name of role to delete from user
 * @returns database result
 */
export const deleteRole = async (userId: string, roleId: string) => {
  return db.userRole.delete({
    where: { roleId_userId: { userId, roleId } },
  });
};

/**
 * find a role on a user
 * @param userId id of user to find
 * @param roleId name of role to find
 * @returns database result
 */
export const hasRole = async (userId: string, roleId: string) => {
  return db.userRole.findFirst({ where: { userId, roleId } });
};

/**
 * find a user by id
 * @param userId id of user to find
 * @returns database result
 */
const findAll = async ({ page, take }) => {
  const result = await db.user.findMany({ skip: take * (page ?? 0), take: take });
  return result.map((user) => omit(user, ['password']));
};

/**
 * find a user by id
 * @param userId id of user to find
 * @returns database result
 */
const findById = async (userId: string) => {
  const result = await db.user.findUnique({ where: { userId } });
  return omit(result, ['password', 'deleted']);
};

/**
 * find a user by email or username
 * @param email email of user to find
 * @param username username of user to find
 * @returns database result
 */
const findByEmailOrUsername = async ({ email, username }) => {
  const result = await db.user.findFirst({ where: { OR: { email, username } } });
  return omit(result, ['password']);
};

/**
 * find a user by email
 * @param email email of user to find
 * @returns database result
 */
const findByEmail = async (email: string) => {
  const result = await db.user.findFirst({ where: { email } });
  return omit(result, ['password']);
};

/**
 * find a user by username
 * @param username username of user to find
 * @returns database result
 */
const findByUsername = async (username: string) => {
  const result = await db.user.findFirst({ where: { username } });
  return omit(result, ['password']);
};

export const LobbyHelper = {
  create,
  patch,
  activate,
  deactivate,
  addRole,
  deleteRole,
  hasRole,
  findAll,
  findById,
  findByEmailOrUsername,
  findByEmail,
  findByUsername,
};
