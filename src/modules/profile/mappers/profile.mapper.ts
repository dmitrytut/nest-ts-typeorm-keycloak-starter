import { IMapper } from '../../../common/interfaces/IMapper';
import { Profile } from '../../../entity/profile.entity';
import { CreateOrUpdateProfileDto } from '../dto/createOrUpdate.dto';
import { ProfileDto } from '../dto/profile.dto';

export class ProfileMapper implements IMapper<Profile, CreateOrUpdateProfileDto, ProfileDto> {
    toEntity(dto: CreateOrUpdateProfileDto, userId: string): Profile {
        return {
            id: userId,
            name: dto.name,
            birthDate: dto.birthDate,
        };
    }

    toDto(entity: Profile): ProfileDto {
        return {
            id: entity.id,
            name: entity.name,
            birthDate: entity.birthDate,
        };
    }
}

export const profileMapper = new ProfileMapper();
