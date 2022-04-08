import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Post } from './Post';
import { ReportReason } from './common/Enums';

@Entity()
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Post, (post) => post.report, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @ManyToOne(() => Comment, (comment) => comment.report, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'comment_id' })
    comment!: Comment;

    @ManyToOne(() => User, (user) => user.report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'enum', name: 'reason', nullable: false, enum: ReportReason })
    reason!: ReportReason;

    @Column({ type: 'int', name: 'count', default: 1 })
    count!: number;

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
}

export default Report;
