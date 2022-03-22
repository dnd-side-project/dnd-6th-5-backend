import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';
import { ReportReason } from './common/Enums';

@Entity()
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'enum', name: 'reason', nullable: false, enum: ReportReason })
    reason!: ReportReason;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        nullable: false,
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        nullable: false,
    })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Post, (post) => post.report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post!: Post;
}

export default Report;
