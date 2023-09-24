import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { DishesRepository } from './dishes.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EstablishmentsModule } from 'src/establishments/establishments.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, EstablishmentsModule, UsersModule, AuthModule],
  controllers: [DishesController],
  providers: [DishesService, DishesRepository],
})
export class DishesModule {}
