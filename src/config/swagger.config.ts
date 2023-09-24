import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Quem-tem-boca-API')
  .setDescription(
    `Welcome to the Quem tem boca API! 
    This API provides access to the resources of our delivery application.
    With this API, you can perform various operations, including registering 
    and managing users, establishments, dishes, drinks and much more. 
    Explore available operations and make the most of our platform.
    See the documentation below for detailed information on how to use the API and available features.`,
  )
  .addBearerAuth()
  .setVersion('1.0')
  .build();
