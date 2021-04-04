import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../../entity/profile.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {}

    public async findById(id: string): Promise<Profile | null> {
        return await this.profileRepository.findOneOrFail(id);
    }

    public async create(profile: Profile): Promise<Profile> {
        return this.profileRepository.save(profile);
    }

    public async update(profile: Profile): Promise<Profile | null> {
        const { id, ...restProfile } = profile;
        const currentProfile = await this.findById(id);
        if (!currentProfile.id) {
            throw new NotFoundException(`Profile '${id}' not found`);
        }
        await this.profileRepository.update(id, restProfile);

        return this.findById(id);
    }
}
