import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { faker } from '@faker-js/faker';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersFactory } from '../utils/users.factory';

let globalId = 1;

function getNextId() {
  return globalId++;
}

const fakeUsersData = [];

const repositoryMock = {
  create: jest.fn().mockImplementation((userData: CreateUserDto) => {
    const id = getNextId();
    const createdAt = new Date();
    const updatedAt = new Date();
    const user = new User({ id, ...userData, createdAt, updatedAt });
    fakeUsersData.push(user);
    return { id, username: user.username, createdAt, updatedAt };
  }),
  findByEmail: jest.fn().mockImplementation((email: string) => {
    const user = fakeUsersData.find((user) => user.email === email);
    if (user) {
      const { id, username, password } = user;
      return { id, username, password };
    }
    return user;
  }),
  findAll: jest.fn().mockImplementation(() => {
    return fakeUsersData.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }),
  findOne: jest.fn().mockImplementation((id: number) => {
    const user = fakeUsersData.find((user) => user.id === id);
    if (user) {
      const { id, username, createdAt, updatedAt } = user;
      return { id, username, createdAt, updatedAt };
    }
    return null;
  }),
  update: jest
    .fn()
    .mockImplementation((id: number, updateUserData: UpdateUserDto) => {
      const userIndex = fakeUsersData.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        fakeUsersData[userIndex] = {
          ...fakeUsersData[userIndex],
          ...updateUserData,
          updatedAt: new Date(),
        };
        const { id, username, createdAt, updatedAt } = fakeUsersData[userIndex];
        return { id, username, createdAt, updatedAt };
      }
      return null;
    }),
  remove: jest.fn().mockImplementation((id: number) => {
    const userIndex = fakeUsersData.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const removedUser = fakeUsersData.splice(userIndex, 1)[0];
      const { id, username, createdAt, updatedAt } = removedUser;
      return { id, username, createdAt, updatedAt };
    }
    return null;
  }),
};

describe('UsersService', () => {
  let usersFactory: UsersFactory;
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersFactory,
        UsersService,
        { provide: UsersRepository, useValue: repositoryMock },
        { provide: EncryptionService, useClass: EncryptionService },
      ],
    }).compile();

    usersFactory = module.get<UsersFactory>(UsersFactory);
    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUserData: CreateUserDto = usersFactory.generateUserParams();
      const user: UserResponseDTO = await usersService.create(newUserData);

      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(user).toBeDefined();
      expect(user).not.toHaveProperty('email');
      expect(user).not.toHaveProperty('password');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
      expect(user.id).toBe(globalId - 1);
      expect(user.username).toBe(newUserData.username);
    });

    it(`should throw ConflictException if user's email is duplicate`, async () => {
      const newUserData: CreateUserDto = usersFactory.generateUserParams();
      await usersService.create(newUserData);
      const lengthData = fakeUsersData.length;
      const otherUserData: CreateUserDto = usersFactory.generateUserParams({
        email: newUserData.email,
      });

      await expect(usersService.create(otherUserData)).rejects.toThrowError(
        ConflictException,
      );

      expect(lengthData).toBe(fakeUsersData.length);
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(2);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const usersList: UserResponseDTO[] = await usersService.findAll();

      expect(usersList).toBeDefined();
      expect(usersList).toBeInstanceOf(Array);
      expect(usersList.length).toEqual(fakeUsersData.length);
      usersList.forEach((user, index) => {
        expect(user.id).toEqual(fakeUsersData[index].id);
        expect(user.username).toEqual(fakeUsersData[index].username);
        expect(user.createdAt).toEqual(fakeUsersData[index].createdAt);
        expect(user.updatedAt).toEqual(fakeUsersData[index].updatedAt);
        expect(user).not.toHaveProperty('email');
        expect(user).not.toHaveProperty('password');
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const newUserData: CreateUserDto = usersFactory.generateUserParams();
      const user: UserResponseDTO = await usersService.create(newUserData);
      const userFound: UserResponseDTO = await usersService.findOne(user.id);

      expect(userFound).toBeDefined();
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(user.id);
      expect(user).toEqual(userFound);
    });

    it('should throw NotFoundException if user is not found', async () => {
      await expect(usersService.findOne(0)).rejects.toThrowError(
        NotFoundException,
      );

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(0);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const newUserData: CreateUserDto = usersFactory.generateUserParams();
      const user: UserResponseDTO = await usersService.create(newUserData);
      const updateUserData: UpdateUserDto = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const updatedUser: UserResponseDTO = await usersService.update(
        user.id,
        updateUserData,
      );

      expect(user).toBeDefined();
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(updatedUser).toBeDefined();
      expect(usersRepository.update).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(user.id);
      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.username).toBe(updateUserData.username);
      expect(updatedUser.createdAt).toBe(user.createdAt);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const updateUserData: UpdateUserDto = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      await expect(usersService.update(0, updateUserData)).rejects.toThrowError(
        NotFoundException,
      );

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(0);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const newUserData: CreateUserDto = usersFactory.generateUserParams();
      const user: UserResponseDTO = await usersService.create(newUserData);
      const lengthData = fakeUsersData.length;
      const removedUser = await usersService.remove(user.id);

      expect(user).toBeDefined();
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(removedUser).toBeDefined();
      expect(usersRepository.remove).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(user.id);
      expect(removedUser).toEqual(user);
      expect(fakeUsersData.length).toBe(lengthData - 1);
    });

    it('should throw NotFoundException if user is not found', async () => {
      await expect(usersService.remove(0)).rejects.toThrowError(
        NotFoundException,
      );

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(0);
    });
  });
});
