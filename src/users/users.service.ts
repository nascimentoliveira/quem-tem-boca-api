import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDTO } from './dto/response-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from '@prisma/client';

/**
 * Users Service
 *
 * This service provides functionality for managing user data, including creation, retrieval, updating, and removal of user records.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor for the UsersService.
   *
   * @param usersRepository An instance of the UsersRepository for database operations.
   * @param encryptionService An instance of the EncryptionService for encryption and hashing.
   */
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Check if the email is unique in the database.
   *
   * @param emailHash The hashed email to check for uniqueness.
   * @returns A boolean indicating whether the email is unique.
   */
  private async isEmailUnique(emailHash: string): Promise<boolean> {
    const user: Pick<User, 'id' | 'username' | 'password'> =
      await this.usersRepository.findByEmail(emailHash);
    return !user;
  }

  /**
   * Throw an exception, handling known exceptions and falling back to InternalServerErrorException for unknown exceptions.
   *
   * @param error The exception to handle.
   * @throws {InternalServerErrorException} if the exception is unknown.
   */
  private throwException(error: HttpException): void {
    const knownExceptions = [ConflictException, NotFoundException] as const;

    if (knownExceptions.some((exception) => error instanceof exception)) {
      throw error;
    }

    throw new InternalServerErrorException(
      'An internal server error has occurred. ' +
        'Please check the parameters or try again later.',
    );
  }

  /**
   * Create a new user with the provided data.
   *
   * @param newUserData The data required to create a new user.
   * @returns The newly created user.
   * @throws {ConflictException} if the email is not unique.
   */
  async create(newUserData: CreateUserDto): Promise<UserResponseDTO> {
    try {
      const encryptedEmail: string = this.encryptionService.encryptEmail(
        newUserData.email,
      );
      const isEmailUnique: boolean = await this.isEmailUnique(encryptedEmail);
      if (!isEmailUnique) {
        throw new ConflictException(
          'User with the provided email already exists.',
        );
      }
      const encryptedPassword: string = this.encryptionService.encryptPassword(
        newUserData.password,
      );

      const user = await this.usersRepository.create({
        email: encryptedEmail,
        username: newUserData.username,
        password: encryptedPassword,
      });

      return user;
    } catch (error) {
      this.throwException(error);
    }
  }

  /**
   * Retrieve all users from the database.
   *
   * @returns A list of all users.
   */
  async findAll(): Promise<UserResponseDTO[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      this.throwException(error);
    }
  }

  /**
   * Retrieve a user by their ID.
   *
   * @param id The ID of the user to retrieve.
   * @returns The user with the specified ID.
   * @throws {NotFoundException} if the user is not found.
   */
  async findOne(id: number): Promise<UserResponseDTO> {
    try {
      const user: UserResponseDTO = await this.usersRepository.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      return user;
    } catch (error) {
      this.throwException(error);
    }
  }

  /**
   * Find a user by their email address (hashed).
   *
   * @param emailHash The hashed email address of the user.
   * @returns User information including ID, username, and hashed password.
   */
  async findByEmail(
    emailHash: string,
  ): Promise<Pick<User, 'id' | 'username' | 'password'> | null> {
    try {
      return await this.usersRepository.findByEmail(emailHash);
    } catch (error) {
      this.throwException(error);
    }
  }

  /**
   * Update a user's information.
   *
   * @param id The ID of the user to update.
   * @param updateUserData The data to update for the user.
   * @returns The updated user information.
   * @throws {NotFoundException} if the user is not found.
   */
  async update(
    id: number,
    updateUserData: UpdateUserDto,
  ): Promise<UserResponseDTO> {
    try {
      await this.findOne(id);
      const encryptedPassword: string = this.encryptionService.encryptPassword(
        updateUserData.password,
      );
      return await this.usersRepository.update(id, {
        username: updateUserData.username,
        password: encryptedPassword,
      });
    } catch (error) {
      this.throwException(error);
    }
  }

  /**
   * Remove a user by their ID.
   *
   * @param id The ID of the user to remove.
   * @returns The removed user information.
   * @throws {NotFoundException} if the user is not found.
   */
  async remove(id: number): Promise<UserResponseDTO> {
    try {
      await this.findOne(id);
      return await this.usersRepository.remove(id);
    } catch (error) {
      this.throwException(error);
    }
  }
}
