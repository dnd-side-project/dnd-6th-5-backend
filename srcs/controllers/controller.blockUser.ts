import { RequestHandler } from 'express';
import { blockUserById } from '../repository/index';

const blockUser: RequestHandler = async (req, res) => {
    const userId: number = req.body.userId;
    const blockedId: number = req.body.blockedId;

    try {
        await blockUserById(userId, blockedId);
        return res.status(200).json({
            success: true,
            data: { message: '유저 차단/차단 해제 완료' },
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

export default blockUser;
