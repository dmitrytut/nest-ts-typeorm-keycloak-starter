import { DocumentBuilder } from '@nestjs/swagger';
import * as pkg from '../../package.json';

const packageName = pkg.name;

export const SWAGGER_OPTIONS = new DocumentBuilder()
    .setBasePath('api-doc')
    .setTitle(`${packageName} API`)
    .setDescription(`${packageName} API`)
    .setVersion('1.0')
    .build();
