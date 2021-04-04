import { Profile } from '../../../entity/profile.entity';
import { IProfile } from '../../../modules/profile/interfaces/profile.interface';
import { IMock } from '../interface/mock.interface';

export const ProfileMock: IMock<IProfile> = {
    order: 1,
    repository: Profile,
    syncData: [],
};
