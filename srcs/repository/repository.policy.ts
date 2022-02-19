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

    const result = await User.createQueryBuilder('user')
        .select([
            'user_id',
            'L.policy_id',
            'P.category',
            'P.name',
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
                    .select(['name', 'category', 'content', 'application_period'])
                    .addSelect('id', 'policy_id'),
            'P',
            'L.policy_id = P.policy_id'
        )
        .where('user.id = :userId', { userId: userId })
        .getRawMany();

    return result;
};

export {
    findAllPolicy,
    findPolicyByCategory,
    findOnePolicyById,
    likeOrDislikePolicy,
    findOneUserLikePolicy,
};
