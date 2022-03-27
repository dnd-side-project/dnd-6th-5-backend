import { RequestHandler } from 'express';
import { findAllPostsByUser } from '../repository/index';

const getOneUserPosts: RequestHandler = async (req, res, next) => {
    try {
        const userId: string = req.params.id;

        const post = await findAllPostsByUser(userId);

        return res.status(200).json({
            success: true,
            data: { post },
        });
    } catch (error: any) {
        next(error);
    }
};

export default getOneUserPosts;
