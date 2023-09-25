import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Users Repository
 *
 * The Users Repository handles database operations related to users, such as
 * creating, retrieving, updating, and deleting user profiles. It uses the Prisma
 * service to interact with the database.
 */
@Injectable()
export class UsersRepository {
  /**
   * Constructor of the UsersRepository class.
   * @param prisma - The Prisma service for database interaction.
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Defines a set of fields to sanitize in user responses.
   */
  private sanitizedUser = {
    id: true,
    username: true,
    createdAt: true,
    updatedAt: true,
  };

  /**
   * Create a new user profile.
   *
   * @param newUserData - The data required to create a new user.
   * @returns The newly created user profile.
   */
  async create(newUserData: CreateUserDTO): Promise<UserResponseDTO> {
    return this.prisma.user.create({
      data: newUserData,
      select: this.sanitizedUser,
    });
  }

  /**
   * Find a user by their email address.
   *
   * @param email - The email address of the user to find.
   * @returns The user's ID, username, and password hash.
   */
  async findByEmail(
    email: string,
  ): Promise<Pick<User, 'id' | 'username' | 'password'>> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  /**
   * Get information about a logged-in user.
   *
   * @param id - The unique identifier of the logged-in user.
   * @returns Information about the logged-in user, including their ID and admin status.
   */
  async getLoggedInUser(id: number): Promise<LoggedInUser> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        isAdmin: true,
      },
    });
  }

  /**
   * Retrieve a list of all users with sanitized user data.
   *
   * @returns A list of user profiles with sanitized data.
   */
  async findAll(): Promise<UserResponseDTO[]> {
    return this.prisma.user.findMany({
      select: this.sanitizedUser,
    });
  }

  /**
   * Find a user by their unique identifier with sanitized user data.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns The user profile with sanitized data.
   */
  async findOne(id: number): Promise<UserResponseDTO> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.sanitizedUser,
    });
  }

  /**
   * Update an existing user profile.
   *
   * @param id - The unique identifier of the user to update.
   * @param updateUserData - The data to update in the user profile.
   * @returns The updated user profile with sanitized data.
   */
  async update(
    id: number,
    updateUserData: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserData,
      select: this.sanitizedUser,
    });
  }

  /**
   * Delete an existing user profile.
   *
   * @param id - The unique identifier of the user to delete.
   * @returns The deleted user profile with sanitized data.
   */
  async remove(id: number): Promise<UserResponseDTO> {
    return this.prisma.user.delete({
      where: { id },
      select: this.sanitizedUser,
    });
  }
}
