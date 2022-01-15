import { PrismaClient } from '@prisma/client';

export let db: PrismaClient;

export const connectDB = async () => {
  db = new PrismaClient();
  if (db) {
    console.log('connected successfully to database');

    await db.$connect();
    Object.freeze(db);

    return db;
  } else {
    return null;
  }
};
