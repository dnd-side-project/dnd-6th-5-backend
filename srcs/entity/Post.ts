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
import { User } from './User';
import { Category } from './common/Enums';
import { Comment } from './Comment';

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'enum', name: 'category', nullable: true, enum: Category })
    category!: Category;

    @Column('varchar', { name: 'title', nullable: false, length: 20 })
    title!: string;

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

    @ManyToOne(() => User, (user) => user.post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comment!: Comment[];
}

export default Post;
