import { Policy, Like, User } from '../entity/index';
import { getConnection } from 'typeorm';

const findAllPolicy: () => Promise<Policy[]> = async () => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'id',
            'name',
            'category',
            'summary',
            'application_period as applicationPeriod',
            'likeCount',
        ])
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select('COUNT(like.policy_id)', 'likeCount')
                    .where('like.like_check = true')
                    .addSelect('like.policy_id', 'policy_id')
                    .groupBy('like.policy_id'),
            'L',
            'policy.id = L.policy_id'
        )
        .addSelect('IFNULL(likeCount, 0)', 'likeCount')
        .getRawMany();
    return result;
};

const findOnePolicyById: (id: string) => Promise<Policy | undefined> = async (id) => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'name',
            'number',
            'category',
            'summary',
            'host',
            'application_period as applicationPeriod',
            'announcement',
            'policy_duration as policyDuration',
            'limit_age as limitAge',
            'limit_area_asset as limitAreaAsset',
            'specialization',
            'content',
            'note',
            'limited_target as limitedTarget',
            'support_scale as supportScale',
            'application_process as applicationProcess',
            'application_site as applicationSite',
            'application_site_name as applicationSiteName',
            'submission',
            'other_info as otherInfo',
            'operating_institute as operatingInstitute',
            'reference_site1 as referenceSite1',
            'reference_site2 as referenceSite2',
            'likeCount',
        ])
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select('COUNT(like.policy_id)', 'likeCount')
                    .where('like.like_check = true')
                    .addSelect('like.policy_id', 'policy_id')
                    .groupBy('like.policy_id'),
            'L',
            'policy.id = L.policy_id'
        )
        .addSelect('IFNULL(likeCount, 0)', 'likeCount')
        .where('id = :id', { id: parseInt(id) })
        .getRawOne();
    return result;
};

const findPolicyByCategory: (category: string) => Promise<Policy[]> = async (category) => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'id',
            'name',
            'category',
            'summary',
            'application_period as applicationPeriod',
            'likeCount',
        ])
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select('COUNT(like.policy_id)', 'likeCount')
                    .where('like.like_check = true')
                    .addSelect('like.policy_id', 'policy_id')
                    .groupBy('like.policy_id'),
            'L',
            'policy.id = L.policy_id'
        )
        .addSelect('IFNULL(likeCount, 0)', 'likeCount')
        .where('policy.category = :category', { category: category })
        .getRawMany();
    return result;
};

const likeOrDislikePolicy: (userId: number, policyId: number) => Promise<void> = async (
    userId,
    policyId
) => {
    const user = await User.findOneOrFail({ id: userId });
    const policy = await Policy.findOneOrFail({ id: policyId });

    const data = await Like.findOne({ user: user, policy: policy });

    // 데이터가 존재한다면
    if (data) {
        // like_check 값에 따라 update
        if (data.like_check === false) {
            Like.createQueryBuilder()
                .update()
                .set({
                    like_check: true,
                })
                .where('like.user_id = :userId', { userId: userId })
                .andWhere('like.policy_id = :policyId', { policyId: policyId })
                .execute();
        } else {
            Like.createQueryBuilder()
                .update()
                .set({
                    like_check: false,
                })
                .where('like.user_id = :userId', { userId: userId })
                .andWhere('like.policy_id = :policyId', { policyId: policyId })
                .execute();
        }
    } else {
        // 존재하지 않는다면 좋아요 데이터 추가, like_check 는 true 로
        await getConnection()
            .getRepository(Like)
            .save({ user: user, policy: policy, like_check: true });
    }
};

const findOneUserLikePolicy: (id: string) => Promise<Policy[]> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('Please enter a numeric character for the id value.');
    const targetUser = await User.findOne({ id: userId });
    if (targetUser === undefined) throw Error(`This user_id does not exist.`);

    const result = await User.createQueryBuilder('user')
        .select([
            'L.user_id as user_id',
            'L.policy_id',
            'P.category',
            'P.name',
            'P.host',
            'P.content',
            'P.application_period',
            'L_cnt.cnt',
        ])
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select(['user_id', 'policy_id', 'like_check'])
                    .where('like_check = 1'),
            'L',
            'user.id = L.user_id'
        )
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select(['policy_id', 'count(like_check) as cnt'])
                    .groupBy('policy_id'),
            'L_cnt',
            'L.policy_id = L_cnt.policy_id'
        )
        .leftJoin(
            (qb) =>
                qb
                    .from(Policy, 'policy')
                    .select(['name', 'host', 'category', 'content', 'application_period'])
                    .addSelect('id', 'policy_id'),
            'P',
            'L.policy_id = P.policy_id'
        )
        .where('user.id = :userId', { userId: userId })
        .getRawMany();

    return result;
};

const findOneUserOrderedLikePolicy: (id: string) => Promise<Policy[]> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('Please enter a numeric character for the id value.');
    const targetUser = await User.findOne({ id: userId });
    if (targetUser === undefined) throw Error(`This user_id does not exist.`);

    const result = await User.createQueryBuilder('user')
        .select(['L.user_id as user_id', 'L.policy_id', 'P.category', 'P.name'])
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select(['user_id', 'policy_id', 'like_check', 'updated_at'])
                    .where('like_check = 1'),
            'L',
            'user.id = L.user_id'
        )
        .leftJoin(
            (qb) =>
                qb.from(Policy, 'policy').select(['name', 'category']).addSelect('id', 'policy_id'),
            'P',
            'L.policy_id = P.policy_id'
        )
        .where('user.id = :userId', { userId: userId })
        .orderBy('L.updated_at', 'DESC')
        .getRawMany();

    return result.slice(0, 3);
};

const findFilterPolicy: (filterInfo: any) => Promise<Policy[]> = async (filterInfo) => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'policy.id',
            'category',
            'name',
            'summary',
            'application_period',
            `IFNULL(L.like_cnt, '0') as like_cnt`,
        ])
        .leftJoin(
            (qb) =>
                qb
                    .from(Like, 'like')
                    .select(['count(*) as like_cnt'])
                    .addSelect('policy_id', 'id')
                    .groupBy('id'),
            'L',
            'policy.id = L.id'
        )
        .where(
            `(((cast(regexp_replace(SUBSTRING_INDEX(limit_age, '~', 1), '[^0-9]','') as unsigned) <= :age) 
            and (cast(regexp_replace(SUBSTRING_INDEX(limit_age, '~', -1), '[^0-9]','') as unsigned) >= :age))
            or limit_age = '제한없음')`,
            { age: parseInt(filterInfo.age) }
        )
        .andWhere(`work_status != :workStatus`, { workStatus: filterInfo.workStatus })
        .andWhere(`(company_scale like '%${filterInfo.companyScale}%' or (company_scale is null))`)
        .andWhere(
            `((cast(regexp_replace(median_income, '[^0-9]','') as unsigned) <= cast(:medianIncome as unsigned)) or median_income is null)`,
            { medianIncome: filterInfo.medianIncome }
        )
        .andWhere(`(annual_income like '%${filterInfo.annualIncome}%' or (annual_income is null))`)
        .andWhere(`(asset like '%${filterInfo.asset}%' or (asset is null))`)
        .andWhere(`(has_house != :hasHouse or (has_house is null))`, {
            hasHouse: filterInfo.hasHouse,
        })
        .andWhere(`(is_house_owner != :isHouseOwner or (is_house_owner is null))`, {
            isHouseOwner: filterInfo.isHouseOwner,
        })
        .andWhere(`(marital_status != :maritalStatus or (marital_status is null))`, {
            maritalStatus: filterInfo.maritalStatus,
        })
        .orderBy('number')
        .orderBy('like_cnt', 'DESC')
        .getRawMany();
    return result;
};

export {
    findAllPolicy,
    findPolicyByCategory,
    findOnePolicyById,
    likeOrDislikePolicy,
    findOneUserLikePolicy,
    findOneUserOrderedLikePolicy,
    findFilterPolicy,
};
