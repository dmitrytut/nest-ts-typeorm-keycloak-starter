import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';

import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    // controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
