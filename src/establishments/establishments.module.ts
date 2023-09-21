import { Module } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EstablishmentsRepository } from './establishments.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EstablishmentsController],
  exports: [EstablishmentsService],
  providers: [EstablishmentsService, EstablishmentsRepository],
})
export class EstablishmentsModule {}
