import { Module } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EstablishmentsRepository } from './establishments.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [EstablishmentsController],
  exports: [EstablishmentsService],
  providers: [EstablishmentsService, EstablishmentsRepository],
})
export class EstablishmentsModule {}
