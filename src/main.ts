import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';

import { SWAGGER_OPTIONS } from './config/Swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT;

    if (!port) {
        throw new Error('Port is not defined');
    }

    app.enableShutdownHooks();

    app.use(cookieParser());
    app.use(bodyParser.json({ limit: '20mb' }));
    app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
    app.use(helmet());
    app.use(compression());

    if (process.env.NODE_ENV !== 'production') {
        app.enableCors({
            origin: true,
            credentials: true,
        });
    }

    const document = SwaggerModule.createDocument(app, SWAGGER_OPTIONS);
    SwaggerModule.setup('api-doc', app, document);

    await app.listen(port);

    console.log(`Server successfully started on ${port} port`);
}
bootstrap();
