import { Notice } from '../entity/index';

const findAllNotice: () => Promise<Notice[]> = async () => {
    const result = await Notice.createQueryBuilder('policy')
        .select(['id', 'user_id', 'title', 'content', 'created_at', 'updated_at'])
        .getRawMany();
    console.log(result);
    return result;
};

export { findAllNotice };
