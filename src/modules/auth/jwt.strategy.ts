import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: (() => (req) => {
                let token = null;
                const cookieName = configService.get<string>('auth.cookieName');

                if (req?.cookies?.[cookieName]) {
                    token = req.cookies[cookieName];
                } else {
                    throw new UnauthorizedException();
                }

                return token;
            })(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('auth.secret'),
        });
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async validate(payload: any, done: Function) {
        // TODO: Token decription.
        const user = await this.authService.validateUserToken(payload);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
