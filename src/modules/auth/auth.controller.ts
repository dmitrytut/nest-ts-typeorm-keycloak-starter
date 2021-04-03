import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    private readonly authCookieName: string;
    private readonly authTokenExpiresIn: number;

    constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
        this.authCookieName = configService.get<string>('auth.cookieName');
        this.authTokenExpiresIn = configService.get<number>('auth.expiresIn');
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    public async register(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.authService.register(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    public async login(@Res() response: Response, @Body() loginUser: LoginUserDto): Promise<unknown> {
        const loginData = await this.authService.login(loginUser);
        response.cookie(this.authCookieName, loginData.accessToken, {
            maxAge: this.authTokenExpiresIn * 1000,
            httpOnly: true,
        });

        return response.send(loginData.userInfo);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    public async logout(@Req() request: Request, @Res() response: Response): Promise<Response> {
        response.cookie(this.authCookieName, '', { expires: new Date(0) });

        return response.send({});
    }
}
