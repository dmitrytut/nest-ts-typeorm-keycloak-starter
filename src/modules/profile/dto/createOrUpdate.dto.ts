import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsString } from 'class-validator';

export class CreateOrUpdateProfileDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly name?: string;

    @ApiModelPropertyOptional()
    @IsDateString()
    readonly birthDate?: string;
}
