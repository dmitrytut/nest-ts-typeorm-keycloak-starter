import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { KeycloakConnectModule, AuthGuard, RoleGuard } from 'nest-keycloak-connect';
import { KeycloakConnectOptions } from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';

import { keycloakConfig } from '../../config/keycloak.config';
import { dbConfig } from '../../config/db.config';
import { ProfileModule } from '../profile/profile.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConfig, keycloakConfig],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('db'),
            inject: [ConfigService],
        }),
        KeycloakConnectModule.registerAsync({
            useFactory: (configService: ConfigService) => configService.get<KeycloakConnectOptions>('keycloak'),
            inject: [ConfigService],
        }),
        ProfileModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
