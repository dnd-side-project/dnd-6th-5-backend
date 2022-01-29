import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyScale, WorkPeriod, Income, Asset, HasHouse, IsHouseholder } from './common/Enums';

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

    @Column({ type: 'enum', name: 'company_scale', nullable: false })
    companyScale!: CompanyScale;

    @Column({ type: 'enum', name: 'work_period', nullable: false })
    workPeriod!: WorkPeriod;

    @Column({ type: 'enum', name: 'income' })
    income!: Income;

    @Column({ type: 'enum', name: 'asset' })
    asset!: Asset;

    @Column({ type: 'enum', name: 'has_house' })
    hasHouse!: HasHouse;

    @Column({ type: 'enum', name: 'is_householder' })
    isHouseholder!: IsHouseholder;

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
