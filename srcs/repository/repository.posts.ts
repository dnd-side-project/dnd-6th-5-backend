import { getConnection } from 'typeorm';
import { tPost } from '../../@types/types';
import { Post, Comment, User, Report } from '../entity';
import {
    AnnualIncome,
    Asset,
    Category,
    CompanyScale,
    HasHouse,
    IsHouseOwner,
    MaritalStatus,
    MedianIncome,
    ReportReason,
    WorkStatus,
} from '../entity/common/Enums';

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
        .orderBy('updated_at', 'DESC')
        .getRawMany();
    return result;
};

const findOnePostById: (id: string) => Promise<Post | undefined> = async (id) => {
    const result = await Post.createQueryBuilder('post')
        .select([
            'title',
            'category',
            'post.content as content',
            'author',
            'DATE_FORMAT(age, "%Y-%m-%d") as age',
            'post.marital_status as maritalStatus',
            'work_status as workStatus',
            'company_scale as companyScale',
            'median_income as medianIncome',
            'annual_income as annualIncome',
            'asset',
            'has_house as hasHouse',
            'is_house_owner as isHouseOwner',
            'commentCount',
        ])
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

const findCommentsByPostId: (postId: string) => Promise<Comment[] | undefined> = async (postId) => {
    const result = await Comment.createQueryBuilder('comment')
        .select(['id', 'content', 'commenter'])
        .leftJoin(
            (qb) =>
                qb
                    .from(User, 'user')
                    .select('user.nickname', 'commenter')
                    .addSelect('user.id', 'user_id'),
            'U',
            'comment.user_id = U.user_id'
        )
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(comment.created_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'createdAt'
        )
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(comment.updated_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'updatedAt'
        )
        .where('comment.post_id=:id', { id: postId })
        .getRawMany();
    return result;
};

const findAllPostsByUser: (id: string) => Promise<Post[]> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('id is not number');
    const targetUser = await User.findOne({ id: userId });
    if (targetUser === undefined) throw Error(`This user_id does not exist.`);

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

const createPost: (post: tPost) => Promise<Post> = async (post) => {
    const newPost = new Post();

    newPost.user = await User.findOneOrFail({ id: post.userId });
    newPost.title = post.title as string;
    newPost.category = post.category as Category;
    newPost.content = post.content as string;
    newPost.age = post.age as Date;
    newPost.maritalStatus = post.maritalStatus as MaritalStatus;
    newPost.workStatus = post.workStatus as WorkStatus;
    newPost.companyScale = post.companyScale as CompanyScale;
    newPost.medianIncome = post.medianIncome as MedianIncome;
    newPost.annualIncome = post.annualIncome as AnnualIncome;
    newPost.asset = post.asset as Asset;
    newPost.isHouseOwner = post.isHouseOwner as IsHouseOwner;
    newPost.hasHouse = post.hasHouse as HasHouse;
    await newPost.save();

    return newPost;
};

const findPostsByKeyword: (query: string) => Promise<Post[] | undefined> = async (query) => {
    const result = await await Post.createQueryBuilder('post')
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
        .where('title LIKE :query', { query: `%${query}%` })
        .orWhere('content LIKE :query', { query: `%${query}%` })
        .orderBy('updated_at', 'DESC')
        .getRawMany();

    return result;
};

const updateOnePostById: (id: string, post: tPost) => Promise<tPost | undefined> = async (
    id,
    post
) => {
    const setObj = {
        title: post.title,
        category: post.category as Category,
        content: post.content,
        age: post.age,
        workStatus: post.workStatus,
        companyScale: post.companyScale,
        medianIncome: post.medianIncome,
        annualIncome: post.annualIncome,
        asset: post.asset,
        hasHouse: post.hasHouse,
        isHouseOwner: post.isHouseOwner,
        maritalStatus: post.maritalStatus,
    };

    await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set(setObj)
        .where('id = :id', { id: id })
        .execute();

    const targetPost = await Post.findOne({ id: parseInt(id) });
    if (targetPost === undefined) throw Error(`This post_id does not exist.`);

    return targetPost;
};

const reportOnePost: (userId: number, postId: string, reason: string) => Promise<void> = async (
    userId,
    postId,
    reason
) => {
    const user = await User.findOneOrFail({ id: userId });
    const post = await Post.findOneOrFail({ id: parseInt(postId) });

    let count;
    const tempCnt = await Report.findAndCount({ post: post});

    if (tempCnt[1] == 0) count = 1;
    else count = tempCnt[1] + 1;

    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Report)
        .values({ user: user, post: post, count: count, reason: reason as ReportReason })
        .execute();
};

export {
    findAllPosts,
    findOnePostById,
    findCommentsByPostId,
    findAllPostsByUser,
    createPost,
    findPostsByKeyword,
    updateOnePostById,
    reportOnePost,
};
