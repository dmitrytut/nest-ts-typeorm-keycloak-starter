import { IMapper } from '../../../common/interfaces/IMapper';
import { BaseEntity } from '../../../entity/base.entity';
import { EntityDto } from '../dto/entity.dto';
import { EntityResponseDto } from '../dto/entity.response.dto';

export class EntityMapper implements IMapper<BaseEntity, EntityDto, EntityResponseDto> {
    toEntity(dto: EntityDto): BaseEntity {
        return {
            id: Boolean(dto.id) ? dto.id : undefined,
            title: dto.title,
            description: dto.description,
            order: dto.order,
            createdAt: undefined,
            updatedAt: undefined,
        };
    }

    toDto(entity: BaseEntity): EntityResponseDto {
        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            order: entity.order,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}

export const entityMapper = new EntityMapper();
