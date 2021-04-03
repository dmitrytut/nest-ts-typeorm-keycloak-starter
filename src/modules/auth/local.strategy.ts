import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    private readonly logger = new Logger(AuthService.name);

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            this.logger.log(`Error while validating ${username} password`);
            throw new UnauthorizedException();
        }

        this.logger.log(`${username} has valid password`);

        return user;
    }
}
