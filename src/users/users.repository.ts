import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private sanitizedUser = {
    id: true,
    username: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(newUserData: CreateUserDTO): Promise<UserResponseDTO> {
    return this.prisma.user.create({
      data: newUserData,
      select: this.sanitizedUser,
    });
  }

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

  async findAll(): Promise<UserResponseDTO[]> {
    return this.prisma.user.findMany({
      select: this.sanitizedUser,
    });
  }

  async findOne(id: number): Promise<UserResponseDTO> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.sanitizedUser,
    });
  }

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

  async remove(id: number): Promise<UserResponseDTO> {
    return this.prisma.user.delete({
      where: { id },
      select: this.sanitizedUser,
    });
  }
}
