import { Policy, Like, User } from '../entity/index';
import { getConnection } from 'typeorm';

const findAllPolicy: () => Promise<Policy[]> = async () => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'policy.id',
            'policy.name',
            'policy.category',
            'policy.summary',
            'policy.applicationPeriod',
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
        .getMany();
    return result;
};

const findOnePolicyById: (id: string) => Promise<Policy | undefined> = async (id) => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'policy.name',
            'policy.number',
            'policy.category',
            'policy.summary',
            'policy.host',
            'policy.announcement',
            'policy.applicationPeriod',
            'policy.policyDuration',
            'policy.limitAge',
            'policy.limitAreaAsset',
            'policy.specialization',
            'policy.content',
            'policy.note',
            'policy.limitedTarget',
            'policy.supportScale',
            'policy.applicationProcess',
            'policy.applicationSite',
            'policy.applicationSiteName',
            'policy.submissionDocs',
            'policy.otherInfo',
            'policy.operatingInstitute',
            'policy.referenceSite1',
            'policy.referenceSite2',
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
        .where('id = :id', { id: id })
        .getOneOrFail();
    return result;
};

const findPolicyByCategory: (category: string) => Promise<Policy[]> = async (category) => {
    const result = await Policy.createQueryBuilder('policy')
        .select([
            'policy.id',
            'policy.name',
            'policy.category',
            'policy.summary',
            'policy.applicationPeriod',
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
        .where('policy.category = :category', { category: category })
        .getMany();
    return result;
};

const likeOrDislikePolicy: (userId: number, policyId: number) => Promise<void> = async (
    userId,
    policyId
) => {
    const user = await getConnection().getRepository(User).findOneOrFail({ id: userId });
    const policy = await getConnection().getRepository(Policy).findOneOrFail({ id: policyId });

    const data = await getConnection().getRepository(Like).findOne({ user: user, policy: policy });

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

export { findAllPolicy, findPolicyByCategory, findOnePolicyById, likeOrDislikePolicy };
