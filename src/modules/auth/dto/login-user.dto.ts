import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginUserDto {
    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly password: string;
}
