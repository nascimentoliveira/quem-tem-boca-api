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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    PrismaModule,
    EncryptionModule,
    AuthModule,
    UsersModule,
    EstablishmentsModule,
    DishesModule,
    DrinksModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedirectMiddleware).forRoutes('/', '/api');
  }
}
