import { getConnection } from 'typeorm';
import { ReportReason } from '../entity/common/Enums';
import { Post, Comment, User, Report } from '../entity/index';

const findOneUserComment: (id: string) => Promise<Comment[]> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('Please enter a numeric character for the id value.');
    const targetUser = await User.findOne({ id: userId });
    if (targetUser === undefined) throw Error(`This is a user id that does not exist.`);

    const result = await Comment.createQueryBuilder('comment')
        .select(['user_id', 'P.post_id', 'id as comment_id', 'P.title', 'content'])
        .leftJoin(
            (qb) =>
                qb.from(Post, 'post').select(['title', 'created_at']).addSelect('id', 'post_id'),
            'P',
            'comment.post_id = P.post_id'
        )
        .where('comment.user_id = :userId', { userId: userId })
        .addSelect('DATE_FORMAT(P.created_at, "%Y/%m/%d")', 'createdAt')
        .getRawMany();

    return result;
};

const createComment: (postId: string, userId: number, content: string) => Promise<Comment> = async (
    postId,
    userId,
    content
) => {
    const newComment = new Comment();
    newComment.post = await Post.findOneOrFail({ id: parseInt(postId) });
    newComment.user = await User.findOneOrFail({ id: userId });
    newComment.content = content;
    await newComment.save();

    return newComment;
};

const updateOneCommentById: (
    commentId: number,
    content: string
) => Promise<Comment | undefined> = async (commentId, content) => {
    await getConnection()
        .createQueryBuilder()
        .update(Comment)
        .set({ content: content })
        .where('id = :id', { id: commentId })
        .execute();

    const targetComment = await Comment.createQueryBuilder('comment')
        .select(['user_id as userId', 'id as commentId', 'content'])
        .where('id = :id', { id: commentId })
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(created_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'createdAt'
        )
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(updated_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'updatedAt'
        )
        .getRawOne();
    if (targetComment === undefined) throw Error(`This comment_id does not exist.`);

    return targetComment;
};

const reportOneComment: (
    userId: number,
    commentId: string,
    reason: string
) => Promise<void> = async (userId, commentId, reason) => {
    const user = await User.findOneOrFail({ id: userId });
    const comment = await Comment.findOneOrFail({ id: parseInt(commentId) });

    let count;
    const tempCnt = await Report.findAndCount({ comment: comment });

    if (tempCnt[1] == 0) count = 1;
    else count = tempCnt[1] + 1;

    const report = await Report.findOne({
        comment: comment,
        user: user,
        reason: reason as ReportReason,
    });
    if (report) throw Error('해당 유저가 해당 글에 대해 같은 이유로 이미 신고했습니다.');
    else
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Report)
            .values({
                user: user,
                comment: comment,
                count: count,
                reason: reason as ReportReason,
            })
            .execute();
};

export { findOneUserComment, createComment, updateOneCommentById, reportOneComment };
