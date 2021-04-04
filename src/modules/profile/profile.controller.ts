import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';

import { ProfileDto } from './dto/profile.dto';
import { CreateOrUpdateProfileDto } from './dto/createOrUpdate.dto';
import { profileMapper } from './mappers/profile.mapper';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    public async get(@Req() request): Promise<ProfileDto> {
        const profile = await this.profileService.findById(request.user.sub);

        return profileMapper.toDto(profile);
    }

    @Post()
    public async create(@Req() request, @Body() profileDto: CreateOrUpdateProfileDto): Promise<ProfileDto> {
        const newProfile = profileMapper.toEntity(profileDto, request.user.sub);
        const profile = await this.profileService.create(newProfile);

        return profileMapper.toDto(profile);
    }

    @Patch()
    public async update(@Req() request, @Body() profileDto: CreateOrUpdateProfileDto): Promise<ProfileDto> {
        const newProfile = profileMapper.toEntity(profileDto, request.user.sub);
        const profile = await this.profileService.update(newProfile);

        return profileMapper.toDto(profile);
    }
}
