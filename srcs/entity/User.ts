import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import {
    CompanyScale,
    WorkPeriod,
    Income,
    Asset,
    HasHouse,
    IsHouseOwner,
    SocialType,
} from './common/Enums';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { name: 'nickname', unique: true, nullable: false, length: 50 })
    nickname!: string;

    @Column({ type: 'int', nullable: false })
    age!: number;

    @Column('varchar', { name: 'address', length: 50, nullable: false })
    address!: string;

    @Column({ type: 'enum', name: 'company_scale', nullable: false, enum: CompanyScale })
    companyScale!: CompanyScale;

    @Column({ type: 'enum', name: 'work_period', nullable: false, enum: WorkPeriod })
    workPeriod!: WorkPeriod;

    @Column({ type: 'enum', name: 'income', enum: Income })
    income!: Income;

    @Column({ type: 'enum', name: 'asset', enum: Asset })
    asset!: Asset;

    @Column({ type: 'enum', name: 'has_house', enum: HasHouse })
    hasHouse!: HasHouse;

    @Column({ type: 'enum', name: 'is_house_owner', enum: IsHouseOwner })
    isHouseOwner!: IsHouseOwner;

    @Column({ type: 'enum', name: 'social_type', enum: SocialType })
    socialType!: SocialType;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date | undefined;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date | undefined;
}

export default User;
