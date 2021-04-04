import { Controller, Get } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Unprotected()
    getHello(): string {
        return this.appService.getHello();
    }
}
