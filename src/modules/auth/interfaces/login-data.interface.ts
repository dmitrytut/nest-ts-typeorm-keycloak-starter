import { UserDto } from '../../user/dto/user.dto';

export interface ILoginData {
    userInfo: UserDto;
    accessToken: string;
}
