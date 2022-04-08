import { RequestHandler } from 'express';
import { reportOneComment } from '../repository/index';

const commentReport: RequestHandler = async (req, res, next) => {
    const commentId: string = req.params.id;
    const userId: number = req.body.userId;
    const reason: string = req.body.reason;

    try {
        await reportOneComment(userId, commentId, reason);
        return res.status(200).json({
            success: true,
            data: { message: '해당 댓글 신고가 완료되었습니다.' },
        });
    } catch (error: any) {
        next(error);
    }
};

export default commentReport;
