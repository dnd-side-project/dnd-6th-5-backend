import { RequestHandler } from 'express';
import { createComment } from '../repository/index';

const postComment: RequestHandler = async (req, res) => {
    const postId: string = req.params.id;
    const userId: number = req.body.userId;
    const content: string = req.body.content;
    try {
        await createComment(postId, userId, content);
        return res.status(200).json({
            success: true,
            data: { message: '댓글 작성 완료' },
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: {
                code: error.name,
                message: error.message,
            },
        });
    }
};

export default postComment;
