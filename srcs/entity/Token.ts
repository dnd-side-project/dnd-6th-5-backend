import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'longtext', name: 'refresh_token', nullable: true })
    refreshToken!: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        nullable: false,
    })
    createdAt!: Date;

    @Column({
        name: 'expires_at',
        nullable: true,
    })
    expiresAt!: string;

    @OneToOne(() => User, (user) => user.token, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
}

export default Token;
