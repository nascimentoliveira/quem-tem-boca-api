import * as dotenv from 'dotenv';

dotenv.config();

export const AUTH_CONFIG = {
  SECRET: process.env.JWT_SECRET,
  EXPIRATION_TIME: process.env.JWT_TOKEN_EXPIRATION_TIME,
  ISSUER: process.env.JWT_ISSUER,
  AUDIENCE: process.env.JWT_AUDIENCE,
};
