import { IUser } from '../../../modules/user/interfaces/user.interface';
import { User } from '../../../entity/user.entity';
import { IMock } from '../interface/mock.interface';

export const UserMock: IMock<IUser> = {
    order: 1,
    repository: User,
    syncData: [
        {
            id: '51d7cf7a-95eb-479c-a6d9-fb9916a9e6b3',
            username: 'tutykhin.da',
            password: '$2b$10$iWj3H.2engrJXwgUy6j6uusXojJFY.60Dyi.zAScKYKwNPEz9eGRe', //123123
            firstName: 'Дмитрий',
            lastName: 'Тутыхин',
        },
        {
            id: 'c1ff651e-9099-4a4a-bb03-46ef76d8bb96',
            username: 'korovin.ao',
            password: '$2b$10$iWj3H.2engrJXwgUy6j6uusXojJFY.60Dyi.zAScKYKwNPEz9eGRe', //123123
            firstName: 'Александр',
            lastName: 'Коровин',
        },
    ],
};
