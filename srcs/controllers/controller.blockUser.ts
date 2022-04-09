import { RequestHandler } from 'express';
import { blockUserById } from '../repository/index';

const blockUser: RequestHandler = async (req, res) => {
    const userId: string = req.params.userId;
    const blockedId: string = req.params.blockedId;

    try {
        await blockUserById(userId, blockedId);
        return res.status(200).json({
            success: true,
            data: { message: '유저 차단 완료' },
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

export default blockUser;
