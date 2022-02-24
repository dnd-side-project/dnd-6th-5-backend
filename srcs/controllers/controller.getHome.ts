import { RequestHandler } from 'express';
import { findOneUserOrderedLikePolicy } from '../repository/index';

const getHome: RequestHandler = async (req, res) => {
    try {
        const userId: string = req.query.userId as string;

        const policy = await findOneUserOrderedLikePolicy(userId);

        return res.status(200).json({
            success: true,
            data: { policy },
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

export default getHome;
