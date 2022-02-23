import { RequestHandler } from 'express';
import { updateOneCommentById } from '../repository/index';

const patchComment: RequestHandler = async (req, res) => {
    const commentId: number = req.body.commentId;
    const content: string = req.body.content;
    try {
        const comment = await updateOneCommentById(commentId, content);
        return res.status(200).json({
            success: true,
            data: { comment },
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

export default patchComment;
