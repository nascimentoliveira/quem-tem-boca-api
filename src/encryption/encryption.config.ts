import * as dotenv from 'dotenv';

dotenv.config();

export const ENCRYPT_CONFIG = {
  SALT: parseInt(process.env.BCRYPT_SALT),
  ALGORITHM: process.env.CRYPTO_ALGORITHM,
};
