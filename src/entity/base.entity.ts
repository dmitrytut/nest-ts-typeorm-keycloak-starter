import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IEntity } from '../common/interfaces/IEntity';

/**
 * Abstract base entity.
 */
export abstract class BaseEntity implements IEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'citext' })
    public title: string;

    @Column('citext', { nullable: true })
    public description?: string;

    @Column('int', { nullable: true })
    public order: number;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    public createdAt: string;

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    public updatedAt: string;
}
