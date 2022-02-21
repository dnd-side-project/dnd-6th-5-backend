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
import {
    AnnualIncome,
    Asset,
    Category,
    CompanyScale,
    HasHouse,
    IsHouseOwner,
    MaritalStatus,
    MedianIncome,
    WorkStatus,
} from './common/Enums';
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

    @Column({ type: 'date', nullable: true })
    age!: Date;

    @Column({ type: 'enum', name: 'work_status', nullable: true, enum: WorkStatus })
    workStatus!: WorkStatus;

    @Column({ type: 'enum', name: 'company_scale', nullable: true, enum: CompanyScale })
    companyScale!: CompanyScale;

    @Column({ type: 'enum', name: 'median_income', nullable: true, enum: MedianIncome })
    medianIncome!: MedianIncome;

    @Column({ type: 'enum', name: 'annual_income', nullable: true, enum: AnnualIncome })
    annualIncome!: AnnualIncome;

    @Column({ type: 'enum', name: 'asset', nullable: true, enum: Asset })
    asset!: Asset;

    @Column({ type: 'enum', name: 'has_house', nullable: true, enum: HasHouse })
    hasHouse!: HasHouse;

    @Column({ type: 'enum', name: 'is_house_owner', nullable: true, enum: IsHouseOwner })
    isHouseOwner!: IsHouseOwner;

    @Column({ type: 'enum', name: 'marital_status', nullable: true, enum: MaritalStatus })
    maritalStatus!: MaritalStatus;

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
