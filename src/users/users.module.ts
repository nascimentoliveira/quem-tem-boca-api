import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [PrismaModule, EncryptionModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
