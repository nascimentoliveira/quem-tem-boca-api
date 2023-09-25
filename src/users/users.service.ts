import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDTO } from './dto/response-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from '@prisma/client';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

/**
 * Users Service
 *
 * The Users Service provides business logic and acts as an intermediary between
 * the Users Controller and the Users Repository. It handles user-related operations
 * such as user creation, retrieval, updating, and deletion. This service also
 * includes encryption and validation checks for user data.
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
   * Check if an email address is unique.
   *
   * @param emailHash - The hashed email address to check for uniqueness.
   * @returns True if the email address is unique; otherwise, false.
   */
  private async isEmailUnique(emailHash: string): Promise<boolean> {
    const user: Pick<User, 'id' | 'username' | 'password'> =
      await this.usersRepository.findByEmail(emailHash);
    return !user;
  }

  /**
   * Create a new user profile.
   *
   * @param newUserData - The data required to create a new user.
   * @returns The newly created user profile.
   * @throws {ConflictException} if the email address is not unique.
   */
  async create(newUserData: CreateUserDTO): Promise<UserResponseDTO> {
    const encryptedEmail: string = this.encryptionService.encryptEmail(
      newUserData.email,
    );
    const isEmailUnique: boolean = await this.isEmailUnique(encryptedEmail);
    if (!isEmailUnique) {
      throw new ConflictException(
        'Já existe um usuário com o e-mail fornecido.',
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
  }

  /**
   * Retrieve a list of all users.
   *
   * @returns A list of user profiles.
   */
  async findAll(): Promise<UserResponseDTO[]> {
    return await this.usersRepository.findAll();
  }

  /**
   * Find a user by their unique identifier.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns The user profile.
   * @throws {NotFoundException} if the user is not found.
   */
  async findOne(id: number): Promise<UserResponseDTO> {
    const user: UserResponseDTO = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  /**
   * Find a user by their email address.
   *
   * @param emailHash - The hashed email address of the user to retrieve.
   * @returns The user's ID, username, and password hash.
   * @throws {NotFoundException} if the user is not found.
   */
  async findByEmail(
    emailHash: string,
  ): Promise<Pick<User, 'id' | 'username' | 'password'>> {
    const user: Pick<User, 'id' | 'username' | 'password'> =
      await this.usersRepository.findByEmail(emailHash);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  /**
   * Get information about a logged-in user.
   *
   * @param currentUserId - The unique identifier of the logged-in user.
   * @returns Information about the logged-in user.
   * @throws {NotFoundException} if the user is not found.
   */
  async getLoggedInUser(currentUserId: number): Promise<LoggedInUser> {
    const user: LoggedInUser =
      await this.usersRepository.getLoggedInUser(currentUserId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  /**
   * Update an existing user profile.
   *
   * @param id - The unique identifier of the user to update.
   * @param updateUserData - The data to update in the user profile.
   * @returns The updated user profile.
   * @throws {NotFoundException} if the user is not found.
   */
  async update(
    id: number,
    updateUserData: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    await this.findOne(id);
    const encryptedPassword: string = this.encryptionService.encryptPassword(
      updateUserData.password,
    );
    return await this.usersRepository.update(id, {
      username: updateUserData.username,
      password: encryptedPassword,
    });
  }

  /**
   * Delete an existing user profile.
   *
   * @param id - The unique identifier of the user to delete.
   * @param user - The logged-in user object for permission checks.
   * @returns The deleted user profile.
   * @throws {ForbiddenException} if the logged-in user does not have permission.
   * @throws {NotFoundException} if the user is not found.
   */
  async remove(id: number, user: LoggedInUser): Promise<UserResponseDTO> {
    if (!user.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esse recurso.',
      );
    }
    await this.findOne(id);
    return await this.usersRepository.remove(id);
  }
}
