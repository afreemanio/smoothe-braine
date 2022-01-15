import crypto from 'crypto';

// import { ServerConfig } from '@libs/config';

// const algorithm = 'aes-256-ctr';
// const iv = crypto.randomBytes(16);

// export const encrypt = (data: string) => {
//   const cipher = crypto.createCipheriv(algorithm, ServerConfig.ADMIN_USER, iv);
//   const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

//   return {
//     iv: iv.toString('hex'),
//     content: encrypted.toString('hex'),
//   };
// };

// export const decrypt = (hash: {
//   iv: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string };
//   content: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string };
// }) => {
//   const decipher = crypto.createDecipheriv(
//     algorithm,
//     ServerConfig.ENCRYPTION_KEY,
//     Buffer.from(hash.iv, 'hex'),
//   );

//   const decrpyted = Buffer.concat([
//     decipher.update(Buffer.from(hash.content, 'hex')),
//     decipher.final(),
//   ]);

//   return decrpyted.toString();
// };
