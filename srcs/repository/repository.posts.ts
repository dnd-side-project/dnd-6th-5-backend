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

const findOnePostById: (id: string) => Promise<Post | undefined> = async (id) => {
    const result = await Post.createQueryBuilder('post')
        .select(['title', 'category', 'post.content as content'])
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(post.created_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'createdAt'
        )
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(post.updated_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'updatedAt'
        )
        .where('post.id = :id', { id: parseInt(id) })
        .getRawOne();
    return result;
};

const findAuthorByPostId: (id: string) => Promise<User | undefined> = async (id) => {
    const post = await Post.createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'author')
        .where('post.id = :id', { id: parseInt(id) })
        .getOne();
    const userId = post?.user.id;
    const result = await User.createQueryBuilder('user')
        .select([
            'nickname',
            'age',
            'work_status as workStatus',
            'company_scale as companyScale',
            'median_income as medianIncome',
            'annual_income as annualIncome',
            'asset',
            'has_house as hasHouse',
            'is_house_owner as isHouseOwner',
            'marital_status as maritalStatus',
        ])
        .where('id=:id', { id: userId })
        .getRawOne();
    return result;
};

const findCommentsByPostId: (id: string) => Promise<Comment[] | undefined> = async (id) => {
    const post = await Post.createQueryBuilder('post')
        .leftJoinAndSelect('post.comment', 'comment')
        .where('post.id = :id', { id: parseInt(id) })
        .getOne();
    const result = post?.comment;
    return result;
};

const createComment: (postId: string, userId: number, content: string) => Promise<Comment> = async (
    postId,
    userId,
    content
) => {
    const newComment = new Comment();
    // newComment.post = await Post.findOne({ id: parseInt(postId) });
    console.log('111');
    newComment.post.id = parseInt(postId);
    console.log('222');
    newComment.user.id = userId;
    console.log('333');
    newComment.content = content;
    await newComment.save();

    return newComment;
};

export { findAllPosts, findOnePostById, findAuthorByPostId, findCommentsByPostId, createComment };
