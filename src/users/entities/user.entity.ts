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
   */
  id?: number;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's name.
   */
  username: string;

  /**
   * The user's password.
   */
  password: string;

  /**
   * The date and time when the user was created.
   */
  createdAt?: string | Date;

  /**
   * The date and time when the users was last updated.
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
