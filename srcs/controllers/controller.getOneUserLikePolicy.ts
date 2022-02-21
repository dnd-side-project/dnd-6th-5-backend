import { RequestHandler } from 'express';
import { findOneUserLikePolicy } from '../repository/index';

const getOneUserLikePolicy: RequestHandler = async (req, res) => {
    try {
        const userId: string = req.params.id;

        const policy = await findOneUserLikePolicy(userId);

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

export default getOneUserLikePolicy;
