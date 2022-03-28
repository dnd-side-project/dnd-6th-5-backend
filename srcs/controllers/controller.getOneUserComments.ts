import { RequestHandler } from 'express';
import { findOneUserComment } from '../repository/index';

const getOneUserComments: RequestHandler = async (req, res, next) => {
    try {
        const userId: string = req.params.id;

        const comment = await findOneUserComment(userId);

        return res.status(200).json({
            success: true,
            data: { comment },
        });
    } catch (error: any) {
        next(error);
    }
};

export default getOneUserComments;
