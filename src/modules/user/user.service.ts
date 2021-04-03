import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { User } from '../../entity/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({ username });
    }

    public async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOneOrFail(id);
    }

    public async create(user: CreateUserDto): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async update(id: number, newValue: CreateUserDto): Promise<User | null> {
        const user = await this.userRepository.findOneOrFail(id);
        if (!user.id) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.update(id, newValue);
        return await this.userRepository.findOne(id);
    }

    public async updateLastLoginAt(id: string): Promise<User> {
        return await this.userRepository.save({
            id,
            lastLoginAt: new Date().toISOString(),
        });
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    public async register(userDto: CreateUserDto): Promise<User> {
        const { username } = userDto;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new BadRequestException('User already exists');
        }
        user = await this.userRepository.create(userDto);

        return await this.userRepository.save(user);
    }
}
