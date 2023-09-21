import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { DrinksRepository } from './drinks.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EstablishmentsModule } from 'src/establishments/establishments.module';

@Module({
  imports: [PrismaModule, EstablishmentsModule],
  controllers: [DrinksController],
  providers: [DrinksService, DrinksRepository],
})
export class DrinksModule {}
