import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { AUTH_CONFIG } from './auth.config';
import { RequestRecoveryDTO } from './dto/request-recovery.dto';

/**
 * Authentication Service
 *
 * This service provides authentication-related functionality, including user
 * authentication and token management.
 */
@Injectable()
export class AuthService {
  /**
   * Constructor for the AuthService.
   *
   * @param usersService An instance of the UsersService for user-related operations.
   * @param encryptionService An instance of the EncryptionService for encryption and password verification.
   * @param jwtService An instance of the JwtService for JWT token management.
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Find a user by their email address.
   *
   * @param email The email address (plaintext) of the user.
   * @returns User information including ID, username, and hashed password.
   */
  private async findUser(
    email: string,
  ): Promise<Pick<User, 'id' | 'username' | 'password'> | null> {
    const encryptedEmail: string = this.encryptionService.encryptEmail(email);
    const user: Pick<User, 'id' | 'username' | 'password'> | null =
      await this.usersService.findByEmail(encryptedEmail);
    return user;
  }

  /**
   * Handles and throws appropriate exceptions based on the provided HttpException.
   *
   * @param error - An instance of HttpException to be handled.
   * @throws {HttpException} - Throws a specific HttpException based on the type of the error.
   * @throws {InternalServerErrorException} - Throws an InternalServerErrorException if the error is not recognized.
   */
  private throwException(error: HttpException): void {
    const knownExceptions = [UnauthorizedException] as const;

    if (knownExceptions.some((exception) => error instanceof exception)) {
      throw error;
    }

    throw new InternalServerErrorException(
      'An internal server error has occurred. ' +
        'Please check the parameters or try again later.',
    );
  }

  /**
   * Check user credentials (email and password) for authentication.
   *
   * @param createAuthDto The DTO containing user credentials.
   * @returns User information (id and username) if authentication is successful.
   * @throws {UnauthorizedException} if authentication fails.
   * @throws {InternalServerErrorException} if tauthentication fails for other reasons.
   */
  private async checkCredentials(
    createAuthDto: CreateAuthDto,
  ): Promise<Pick<User, 'id' | 'username'>> {
    try {
      const user = await this.findUser(createAuthDto.email);
      if (!user) {
        throw new UnauthorizedException('Email or password are incorrect.');
      }
      const validPassword: boolean = this.encryptionService.verifyPassword(
        createAuthDto.password,
        user.password,
      );
      if (!validPassword) {
        throw new UnauthorizedException('Email or password are incorrect.');
      }
      delete user.password;
      return user;
    } catch (error) {
      this.throwException(error);
    }
  }

  /**
   * Creates a JWT token for a user based on their email and user data.
   *
   * @param email - The user's email address.
   * @param user - An object containing user information.
   * @returns A JWT token as a string.
   */
  private async createToken(email: string, user: Partial<User>) {
    return this.jwtService.sign(
      {
        email: email,
      },
      {
        expiresIn: AUTH_CONFIG.EXPIRATION_TIME,
        subject: this.generateSubject(user),
        issuer: AUTH_CONFIG.ISSUER,
        audience: AUTH_CONFIG.AUDIENCE,
      },
    );
  }

  /**
   * Generates a string representation of the subject (sub) for a JWT token based on user data.
   *
   * @param data - An object containing user information.
   * @returns A string representing the subject (sub) of the JWT token.
   */
  generateSubject(data: Partial<User>): string {
    const subjectData: Partial<User> = {
      id: data.id,
    };
    return JSON.stringify(subjectData);
  }

  /**
   * Verify the validity of a provided JWT token.
   *
   * @param token The JWT token to verify.
   * @returns The decoded user data from the token if it's valid.
   * @throws {ForbiddenException} if the token is expired or invalid.
   * @throws {InternalServerErrorException} if token verification fails for other reasons.
   */
  async checkToken(token: string): Promise<Partial<User>> {
    try {
      const data = this.jwtService.verify(token, {
        audience: AUTH_CONFIG.AUDIENCE,
        issuer: AUTH_CONFIG.ISSUER,
      });
      return JSON.parse(data.sub);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  /**
   * Create a new user authentication.
   *
   * @param createAuthDto The DTO containing user credentials.
   * @returns An object containing user information and an access token.
   */
  async create(newAuthData: CreateAuthDto) {
    const user = await this.checkCredentials(newAuthData);
    return {
      id: user.id,
      username: user.username,
      email: newAuthData.email,
      accessToken: await this.createToken(newAuthData.email, user),
    };
  }

  /**
   * Request password recovery.
   *
   * @param requestRecoveryDto - The data required to request password recovery.
   * @returns A message indicating that a recovery email will be sent if the provided email is registered.
   */
  async requestRecovery({ email }: RequestRecoveryDTO) {
    return {
      message: `Se '${email}' estiver cadastrado, um e-mail de recuperação será enviado.`,
    };
  }
}
