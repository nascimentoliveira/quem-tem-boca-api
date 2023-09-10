import { INestApplication, Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({})
export class SwaggerModuleConfig {
  static configure(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Quem-tem-boca-API')
      .setDescription('Documentação de Quem-tem-boca-API')
      .addBearerAuth()
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/documentation', app, document);
  }
}
