export const client_config: {
  DEVELOPMENT: boolean;
  PORT: number;
} = {
  DEVELOPMENT: !!process.env.DEVELOPMENT ?? true,
  PORT: process.env.CLIENT_PORT ? parseInt(process.env.CLIENT_PORT) : 2020,
};

export default client_config;
