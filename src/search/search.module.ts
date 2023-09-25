import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { EstablishmentsModule } from 'src/establishments/establishments.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, EstablishmentsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
