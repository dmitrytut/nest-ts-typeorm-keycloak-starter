import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { IUser } from '../modules/user/interfaces/user.interface';

/**
 * Entity 'User'.
 */
@Entity()
export class User implements IUser {
    /**
     * Identifier.
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * First name.
     */
    @Column({ type: 'citext', nullable: true })
    firstName: string;

    /**
     * Last name.
     */
    @Column('citext', { nullable: true })
    lastName: string;

    /**
     * Username.
     */
    @Column({ type: 'citext', unique: true })
    username: string;

    /**
     * Password.
     */
    @Column()
    password: string;

    /**
     * Last successful login timestamp.
     */
    @Column({ type: 'timestamp with time zone', nullable: true })
    lastLoginAt?: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}
