import { RequestHandler } from 'express';
import { findOneUserComment } from '../repository/index';

const getOneUserComments: RequestHandler = async (req, res) => {
    try {
        const userId: string = req.params.id;

        const comments = await findOneUserComment(userId);

        return res.status(200).json({
            success: true,
            data: { comments },
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

export default getOneUserComments;
