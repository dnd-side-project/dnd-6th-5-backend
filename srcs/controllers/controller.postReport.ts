import { RequestHandler } from 'express';
import { reportOnePost } from '../repository/index';

const postReport: RequestHandler = async (req, res, next) => {
    const postId: string = req.params.id;
    const userId: number = req.body.userId;
    const reason: string = req.body.reason;

    try {
        await reportOnePost(userId, postId, reason);
        return res.status(200).json({
            success: true,
            data: { message: '해당 게시글 신고가 완료되었습니다.' },
        });
    } catch (error: any) {
        next(error);
    }
};

export default postReport;
