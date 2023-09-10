import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { ENCRYPT_CONFIG } from './encryption.config';

/**
 * Encryption Service
 *
 * This service provides encryption and hashing functionality for sensitive data, such as email addresses and passwords.
 */
@Injectable()
export class EncryptionService {
  /**
   * Encrypt an email address using a specified hashing algorithm.
   *
   * @param email The email address to encrypt.
   * @returns The hashed email address.
   */
  encryptEmail(email: string): string {
    const hash: crypto.Hash = crypto.createHash(ENCRYPT_CONFIG.ALGORITHM);
    hash.update(email.toLowerCase());
    return hash.digest('hex');
  }

  /**
   * Encrypt a password using a specified salt.
   *
   * @param password The plaintext password to encrypt.
   * @returns The hashed password.
   */
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, ENCRYPT_CONFIG.SALT);
  }

  /**
   * Verify a plaintext password against a hashed password.
   *
   * @param password The plaintext password to verify.
   * @param hashedPassword The hashed password to compare against.
   * @returns A boolean indicating whether the password is valid.
   */
  verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
