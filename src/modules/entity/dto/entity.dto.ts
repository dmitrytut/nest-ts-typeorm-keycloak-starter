import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

import { IEntity } from '../../../common/interfaces/IEntity';

export class EntityDto implements IEntity {
    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    public readonly id: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public readonly title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public readonly description: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    public readonly order: number;
}
