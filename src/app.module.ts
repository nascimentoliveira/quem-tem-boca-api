import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EncryptionModule } from './encryption/encryption.module';
import { RedirectMiddleware } from './middlewares/redirect.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { DishesModule } from './dishes/dishes.module';
import { DrinksModule } from './drinks/drinks.module';

@Module({
  imports: [PrismaModule, EncryptionModule, UsersModule, AuthModule, EstablishmentsModule, DishesModule, DrinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedirectMiddleware).forRoutes('/', '/api');
  }
}
