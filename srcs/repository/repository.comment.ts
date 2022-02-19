import { Post, Comment, User } from '../entity/index';

const findOneUserComment: (id: string) => Promise<Comment[]> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('Please enter a numeric character for the id value.');

    const result = await Comment.createQueryBuilder('comment')
        .select(['user_id', 'P.post_id', 'id as comment_id', 'content', 'P.title'])
        .leftJoin(
            (qb) =>
                qb.from(Post, 'post').select(['title', 'created_at']).addSelect('id', 'post_id'),
            'P',
            'comment.post_id = P.post_id'
        )
        .where('comment.user_id = :userId', { userId: userId })
        .addSelect(
            'DATE_FORMAT(CONVERT_TZ(P.created_at, "UTC", "Asia/Seoul"), "%Y/%m/%d")',
            'createdAt'
        )
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

export { findOneUserComment, createComment };
