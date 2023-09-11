import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Quem-tem-boca-API')
  .setDescription('Documentação de Quem-tem-boca-API')
  .addBearerAuth()
  .setVersion('1.0')
  .build();
