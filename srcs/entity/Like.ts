import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Policy } from './Policy';
import { User } from './User';

@Entity()
export class Like extends BaseEntity {
    @Column({ type: 'boolean', name: 'like_check', nullable: false, default: false })
    like_check!: string;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        nullable: false,
    })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.like, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Policy, (policy) => policy.like, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'post_id' })
    policy!: Policy;
}

export default Like;
