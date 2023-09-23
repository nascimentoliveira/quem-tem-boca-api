import { Prisma } from '@prisma/client';

/**
 * User Entity
 *
 * This entity represents a user in the application. It includes properties
 * such as the user's ID, email, username, password, creation date, and last
 * update date.
 */
export class User implements Partial<Prisma.UserUncheckedCreateInput> {
  /**
   * The unique identifier of the user.
   * @example 1
   */
  id?: number;

  /**
   * The user's email address.
   * @example 'user@example.com'
   */
  email: string;

  /**
   * The user's name.
   * @example 'John Doe'
   */
  username: string;

  /**
   * The user's password.
   * @example 'password123'
   * @security
   */
  password: string;

  /**
   * Indicates whether the user has administrator privileges.
   * @example true
   */
  isAdmin: boolean;

  /**
   * The date and time when the user was created.
   * @example '2023-09-20T12:00:00Z'
   */
  createdAt?: string | Date;

  /**
   * The date and time when the user was last updated.
   * @example '2023-09-20T14:30:00Z'
   */
  updatedAt?: string | Date;

  /**
   * Constructs a new User instance with the provided data.
   * @param data An object containing user data to initialize the instance.
   */
  constructor(data: User) {
    Object.assign(this, data);
  }
}
