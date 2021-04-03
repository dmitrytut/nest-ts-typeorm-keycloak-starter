import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_OPTIONS = new DocumentBuilder()
    .setBasePath('api-doc')
    .setTitle('SberMentor API')
    .setDescription('SberMentor API')
    .setVersion('1.0')
    .build();
