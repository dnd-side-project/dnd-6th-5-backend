import { RequestHandler } from 'express';
import { Comment } from '../entity';

const deleteComment: RequestHandler = async (req, res) => {
    const id: string = req.body.commentId;
    try {
        const comment = await Comment.findOne({ id: parseInt(id) });
        if (comment) {
            Comment.delete({ id: parseInt(id) });
            return res.status(200).json({
                success: true,
                data: { message: '댓글 삭제 완료' },
            });
        } else {
            throw new Error('No matching comment in db');
        }
    } catch (error: any) {
        res.status(404).json({
            success: false,
            error: {
                code: error.name,
                message: error.message,
            },
        });
    }
};

export default deleteComment;
