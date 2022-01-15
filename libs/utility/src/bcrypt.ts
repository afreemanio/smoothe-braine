import bcrypt from 'bcrypt';

import { ServerConfig } from '@libs/config';

const saltRounds = ServerConfig.BCRYPT_SALT_ROUNDS || 10;

/**
 * Salt the hash
 * @param rounds Round's salt must undergo.
 */
export const genSalt = (rounds: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
};

/**
 * Hash a string using bcrypt.
 * @param data String to be hashed.
 */
export const genHash = (data: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(data, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

/**
 * Compare a string to a hashed value.
 * @param data Data to match against hash.
 * @param hash Hash to compare data with.
 */
export const compare = (data: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
