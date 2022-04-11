import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Block extends BaseEntity {
    @Column({ type: 'boolean', name: 'block_check', nullable: false, default: false })
    block_check!: boolean;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        nullable: false,
    })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.block, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => User, (user) => user.block, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'blocked_id' })
    blocked!: User;
}

export default Block;
