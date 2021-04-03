import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../../entity/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { ILoginData } from './interfaces/login-data.interface';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    private readonly logger = new Logger(AuthService.name);

    private createToken(user: User): string {
        // TODO: Encrypt token.
        return this.jwtService.sign({
            id: user.id,
        });
    }

    async register(user: CreateUserDto): Promise<boolean> {
        try {
            await this.userService.register(user);

            return true;
        } catch (err) {
            this.logger.warn(err);
            throw new BadRequestException('User registration failed');
        }
    }

    async login(loginUser: LoginUserDto): Promise<ILoginData> {
        const user = await this.userService.findByUsername(loginUser.username);
        if (!user) {
            throw new BadRequestException('User Not Found');
        }
        const userInfo: UserDto = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        };

        const token = this.createToken(user);
        if (token) {
            const updatedUser = await this.userService.updateLastLoginAt(user.id);
            userInfo.lastLoginAt = updatedUser.lastLoginAt;
        }

        return {
            userInfo,
            accessToken: token,
        };
    }

    async validateUserToken(payload: IJwtPayload): Promise<User> {
        return await this.userService.findById(payload.id);
    }

    async validateUser(username: string, password: string): Promise<UserDto> {
        const user = await this.userService.findByUsername(username);
        const status = await user?.comparePassword(password);
        if (status) {
            this.logger.log('password check success');
            const { password, hashPassword, comparePassword, ...result } = user;

            return {
                ...result,
                lastLoginAt: result.lastLoginAt || null,
            };
        }

        return null;
    }
}
