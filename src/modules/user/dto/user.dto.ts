import {
    ApiModelProperty,
    ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto {
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    username: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelPropertyOptional()
    lastLoginAt?: string;
}
