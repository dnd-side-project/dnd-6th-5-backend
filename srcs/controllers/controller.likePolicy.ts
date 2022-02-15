import { RequestHandler } from 'express';
import { likeOrDislikePolicy } from '../repository/index';

const likePolicy: RequestHandler = async (req, res) => {
    const userId: number = req.body.userId;
    const policyId: number = req.body.policyId;

    try {
        await likeOrDislikePolicy(userId, policyId);
        return res.status(200).json({
            success: true,
            data: { message: '정책 찜하기/취소 완료' },
        });
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

export default likePolicy;
