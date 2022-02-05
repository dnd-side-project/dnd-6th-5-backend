import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from './User';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'longtext', name: 'content', nullable: false })
    content!: string;

    @IsEmail()
    @Column({ type: 'varchar', name: 'email', nullable: false })
    email!: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        nullable: false,
    })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.question, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
}

export default Question;
