import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import {
    Category,
    WorkStatus,
    CompanyScale,
    MedianIncome,
    AnnualIncome,
    Asset,
    HasHouse,
    IsHouseOwner,
    MaritalStatus,
} from './common/Enums';
import { Like } from './Like';

@Entity()
export class Policy extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { name: 'name', nullable: true, length: 100 })
    name!: string;

    @Column({ type: 'enum', name: 'category', nullable: true, enum: Category })
    category!: Category;

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

    @Column({ type: 'longtext', name: 'summary', nullable: false })
    summary!: string;

    @Column('varchar', { name: 'host', nullable: true, length: 50 })
    host!: string;

    @Column({ type: 'datetime', name: 'open_date', nullable: true })
    open_date!: string;

    @Column('varchar', { name: 'application_period', nullable: true, length: 100 })
    application_period!: string;

    @Column('varchar', { name: 'announcement', nullable: true, length: 100 })
    announcement!: string;

    @Column('varchar', { name: 'policy_duration', nullable: true, length: 100 })
    policy_duration!: string;

    @Column('varchar', { name: 'limit_age', nullable: true, length: 100 })
    limit_age!: string;

    @Column({ type: 'longtext', name: 'limit_area_asset', nullable: false })
    limit_area_asset!: string;

    @Column('varchar', { name: 'specialization', nullable: true, length: 100 })
    specialization!: string;

    @Column({ type: 'longtext', name: 'content', nullable: false })
    content!: string;

    @Column({ type: 'longtext', name: 'note', nullable: false })
    note!: string;

    @Column('varchar', { name: 'limited_target', nullable: true, length: 100 })
    limited_target!: string;

    @Column('varchar', { name: 'support_scale', nullable: true, length: 100 })
    support_scale!: string;

    @Column({ type: 'longtext', name: 'application_process', nullable: false })
    application_process!: string;

    @Column('varchar', { name: 'application_site', nullable: false, length: 2084 })
    application_site!: string;

    @Column('varchar', { name: 'application_site_name', nullable: true, length: 255 })
    application_site_name!: string;

    @Column({ type: 'longtext', name: 'submission', nullable: false })
    submission_docs!: string;

    @Column({ type: 'longtext', name: 'other_info', nullable: true })
    other_info!: string;

    @Column('varchar', { name: 'operating_institute', nullable: true, length: 50 })
    operating_institute!: string;

    @Column('varchar', { name: 'reference_site1', nullable: true, length: 2084 })
    reference_site1!: string;

    @Column('varchar', { name: 'reference_site2', nullable: true, length: 2084 })
    reference_site2!: string;

    @OneToMany(() => Like, (like) => like.policy)
    like!: Like[];
}

export default Policy;
