import { Post, Comment, User } from '../entity';

const findAllPosts: () => Promise<Post[]> = async () => {
    const result = await Post.createQueryBuilder('post')
        .select(['id', 'author', 'title', 'category', 'content', 'commentCount'])
        .leftJoin(
            (qb) =>
                qb
                    .from(Comment, 'comment')
                    .select('COUNT(comment.post_id)', 'commentCount')
                    .addSelect('comment.post_id', 'post_id')
                    .groupBy('comment.post_id'),
            'C',
            'post.id = C.post_id'
        )
        .leftJoin(
            (qb) =>
                qb
                    .from(User, 'user')
                    .select('user.nickname', 'author')
                    .addSelect('user.id', 'user_id'),
            'U',
            'post.user_id = U.user_id'
        )
        .addSelect('IFNULL(commentCount, 0)', 'commentCount')
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(created_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'createdAt'
        )
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(updated_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'updatedAt'
        )
        .getRawMany();
    return result;
};

const findAllPostsByUser: (id: string) => Promise<Post[]> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('id is not number');

    const result = await User.createQueryBuilder('U')
        .select(['id as user_id', 'post_id', 'nickname', 'P.category', 'title', 'content', 'C.cnt'])
        .leftJoin(
            (qb) =>
                qb
                    .from(Post, 'post')
                    .select(['user_id', 'category', 'title', 'content', 'created_at', 'updated_at'])
                    .addSelect('id', 'post_id'),
            'P',
            'U.id = P.user_id'
        )
        .leftJoin(
            (qb) =>
                qb
                    .from(Comment, 'C')
                    .select('COUNT(*)', 'cnt')
                    .addSelect('post_id', 'p_id')
                    .groupBy('p_id'),
            'C',
            'P.post_id = C.p_id'
        )
        .where('U.id = :id', { id: userId })
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(P.created_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'createdAt'
        )
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(P.updated_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'updatedAt'
        )
        .getRawMany();

    return result;
};

export { findAllPosts, findAllPostsByUser };
