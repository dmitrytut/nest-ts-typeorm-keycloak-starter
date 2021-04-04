import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IProfile } from '../modules/profile/interfaces/profile.interface';

/**
 * Entity 'Profile'.
 */
@Entity()
export class Profile implements IProfile {
    /**
     * Identifier.
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Name.
     */
    @Column({ type: 'citext', nullable: true })
    name?: string;

    /**
     * Birth date.
     */
    @Column({ type: 'timestamp with time zone', nullable: true })
    birthDate?: string;
}
