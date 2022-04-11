import { Block } from '../entity/index';

const findOneUserBlock: (userId: string) => Promise<any[]> = async (userId) => {
    const blocked_user = await Block.createQueryBuilder('block')
        .select(['blocked_id'])
        .where('user_id = :id', { id: parseInt(userId) })
        .getRawMany();

    return blocked_user;
};

export { findOneUserBlock };
