import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import {
    WorkStatus,
    CompanyScale,
    MedianIncome,
    AnnualIncome,
    Asset,
    HasHouse,
    IsHouseOwner,
    MaritalStatus,
    SocialType,
} from './common/Enums';
import Question from './Question';
import { Token } from './Token';
import { Post } from './Post';
import { Notice } from './Notice';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { name: 'nickname', unique: true, nullable: false, length: 50 })
    nickname!: string;

    @Column({ type: 'int', nullable: false })
    age!: number;

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

    @Column({ type: 'enum', name: 'social_type', enum: SocialType })
    socialType!: SocialType;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt!: Date;

    @OneToOne(() => Token, (token) => token.user)
    token!: Token;

    @OneToMany(() => Post, (post) => post.user)
    post!: Post[];

    @OneToMany(() => Notice, (notice) => notice.user)
    notice!: Notice[];

    @OneToMany(() => Question, (question) => question.user)
    question!: Question[];
}

export default User;
