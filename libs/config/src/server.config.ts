export const server_config: {
  DEVELOPMENT: boolean;
  PORT: number;
  SESSION_KEYS: string[];
  BCRYPT_SALT_ROUNDS: number;
  DATABASE_URL: string;
  ADMIN_EMAIL: string;
  ADMIN_USER: string;
  ADMIN_PASS: string;
} = {
  DEVELOPMENT: !!process.env.DEVELOPMENT ?? true,
  PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 2001,
  SESSION_KEYS: process.env.SESSION_KEYS
    ? JSON.parse(process.env.SESSION_KEYS)
    : ['super-duper-secret', 'even-more-secret'],
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 0,
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  ADMIN_USER: process.env.ADMIN_USER ?? 'admin',
  ADMIN_PASS: process.env.ADMIN_PASS ?? 'password',
};

export default server_config;
