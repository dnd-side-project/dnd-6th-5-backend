import { Notice } from '../entity/index';

const findAllNotice: () => Promise<Notice[]> = async () => {
    const result = await Notice.createQueryBuilder()
        .select(['id', 'user_id', 'title', 'content', 'created_at', 'updated_at'])
        .getRawMany();

    return result;
};

export { findAllNotice };
