import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Post } from './Post';
import Report from './Report';
import { User } from './User';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'longtext', name: 'content', nullable: false })
    content!: string;

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

    @ManyToOne(() => User, (user) => user.comment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @OneToMany(() => Report, (report) => report.comment)
    report!: Report[];
}

export default Comment;
