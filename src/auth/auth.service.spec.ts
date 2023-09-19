import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EncryptionService } from '../encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { User } from '../users/entities/user.entity';
import { UsersFactory } from '../utils/users.factory';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AUTH_CONFIG } from './auth.config';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let usersFactory: UsersFactory;
  let authService: AuthService;
  let usersService: UsersService;
  let encryptionService: EncryptionService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UsersFactory,
        { provide: EncryptionService, useClass: EncryptionService },
        UsersService,
        { provide: UsersRepository, useClass: UsersRepository },
        { provide: PrismaService, useClass: PrismaService },
      ],
    }).compile();

    usersFactory = module.get<UsersFactory>(UsersFactory);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    encryptionService = module.get<EncryptionService>(EncryptionService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user authentication and return user information with an access token', async () => {
      const userProps: CreateUserDTO = usersFactory.generateUserParams();
      const user: User = usersFactory.create(userProps);
      const accessToken: string = faker.string.alphanumeric(50);
      const createAuthData: CreateAuthDTO = {
        email: userProps.email,
        password: userProps.password,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        id: user.id,
        username: user.username,
        password: user.password,
      });
      jest.spyOn(encryptionService, 'verifyPassword').mockReturnValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

      const result = await authService.create(createAuthData);

      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
      expect(typeof result.accessToken).toBe('string');
      expect(result.accessToken.length).toBeGreaterThan(0);
      expect(result).toEqual({
        id: user.id,
        username: user.username,
        email: userProps.email,
        accessToken: accessToken,
      });
      expect(usersService.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersService.findByEmail).toHaveBeenCalledWith(user.email);
      expect(encryptionService.verifyPassword).toHaveBeenCalledTimes(1);
      expect(encryptionService.verifyPassword).toHaveBeenCalledWith(
        userProps.password,
        user.password,
      );
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException if email verification fails', async () => {
      const userProps: CreateUserDTO = usersFactory.generateUserParams();
      const user: User = usersFactory.create(userProps);
      const createAuthData: CreateAuthDTO = {
        email: userProps.email,
        password: userProps.password,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      await expect(authService.create(createAuthData)).rejects.toThrowError(
        UnauthorizedException,
      );

      expect(usersService.findByEmail).toHaveBeenCalledWith(user.email);
      expect(usersService.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException if password verification fails', async () => {
      const userProps: CreateUserDTO = usersFactory.generateUserParams();
      const user: User = usersFactory.create(userProps);
      const createAuthData: CreateAuthDTO = {
        email: userProps.email,
        password: userProps.password,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        id: user.id,
        username: user.username,
        password: user.password,
      });
      jest.spyOn(encryptionService, 'verifyPassword').mockReturnValue(false);
      await expect(authService.create(createAuthData)).rejects.toThrowError(
        UnauthorizedException,
      );

      expect(usersService.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersService.findByEmail).toHaveBeenCalledWith(user.email);
      expect(encryptionService.verifyPassword).toHaveBeenCalledTimes(1);
      expect(encryptionService.verifyPassword).toHaveBeenCalledWith(
        userProps.password,
        user.password,
      );
    });
  });

  describe('checkToken', () => {
    it('should verify a valid JWT token and return decoded data', async () => {
      const userProps: CreateUserDTO = usersFactory.generateUserParams();
      const user: User = usersFactory.create(userProps);
      const accessToken: string = faker.string.alphanumeric(50);
      const createAuthData: CreateAuthDTO = {
        email: userProps.email,
        password: userProps.password,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        id: user.id,
        username: user.username,
        password: user.password,
      });
      jest.spyOn(encryptionService, 'verifyPassword').mockReturnValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

      const result = await authService.create(createAuthData);
      const subject: string = authService.generateSubject({ id: user.id });

      jest.spyOn(jwtService, 'verify').mockReturnValue({ sub: subject });
      const decodedData = await authService.checkToken(result.accessToken);

      expect(result).toBeDefined();
      expect(decodedData).toBeDefined();
      expect(decodedData).toEqual(JSON.parse(subject));
      expect(jwtService.verify).toHaveBeenCalledTimes(1);
      expect(jwtService.verify).toHaveBeenCalledWith(result.accessToken, {
        audience: AUTH_CONFIG.AUDIENCE,
        issuer: AUTH_CONFIG.ISSUER,
      });
    });
    it('should throw ForbiddenException if token is expired', async () => {
      const userProps: CreateUserDTO = usersFactory.generateUserParams();
      const user: User = usersFactory.create(userProps);
      const accessToken: string = faker.string.alphanumeric(50);
      const createAuthData: CreateAuthDTO = {
        email: userProps.email,
        password: userProps.password,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        id: user.id,
        username: user.username,
        password: user.password,
      });
      jest.spyOn(encryptionService, 'verifyPassword').mockReturnValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

      const result = await authService.create(createAuthData);

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new jwt.JsonWebTokenError('Token error');
      });

      await expect(
        authService.checkToken(result.accessToken),
      ).rejects.toThrowError(ForbiddenException);
      expect(jwtService.verify).toHaveBeenCalledTimes(1);
    });
  });
});
