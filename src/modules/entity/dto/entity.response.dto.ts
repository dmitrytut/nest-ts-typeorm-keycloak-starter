import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IEntity } from '../../../common/interfaces/IEntity';

export class EntityResponseDto implements IEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly title: string;

    @ApiPropertyOptional()
    public readonly description: string;

    @ApiPropertyOptional()
    public readonly order: number;

    @ApiProperty()
    public readonly createdAt: string;

    @ApiPropertyOptional()
    public readonly updatedAt: string;
}
