import {
    ApiModelProperty,
    ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ProfileDto {
    @ApiModelProperty()
    id: string;

    @ApiModelPropertyOptional()
    readonly name?: string;

    @ApiModelPropertyOptional()
    readonly birthDate?: string;
}
