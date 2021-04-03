import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { authConfig } from '../../config/authConfig';

import { dbConfig } from '../../config/dbConfig';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConfig, authConfig],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('db'),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
