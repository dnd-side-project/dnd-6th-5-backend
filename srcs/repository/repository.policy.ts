import { Policy, Like } from '../entity/index';

const findAllPolicy: () => Promise<Policy[]> = async () => {
    const result = await Policy.createQueryBuilder().getMany();
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
        ])
        .where('id = :id', { id: id })
        .leftJoinAndSelect('policy.like', 'like') // 좋아요 개수로 변경해야 함
        .getOneOrFail();
    return result;
};

const findPolicyByCategory: (category: string) => Promise<Policy[]> = async (category) => {
    // 좋아요 개수 예시: select count(*) from dnd.like where policy_id = 1 and like_check = true;

    const result = await Policy.createQueryBuilder('policy')
        .select([
            'policy.id',
            'policy.name',
            'policy.category',
            'policy.summary',
            'policy.applicationPeriod',
        ])
        .where('policy.category = :category', { category: category })
        .leftJoinAndSelect('policy.like', 'like')
        .getMany();
    return result;
};

export { findAllPolicy, findPolicyByCategory, findOnePolicyById };
