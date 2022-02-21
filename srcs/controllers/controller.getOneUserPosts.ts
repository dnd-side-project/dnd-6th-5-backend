import { RequestHandler } from 'express';
import { findAllPostsByUser } from '../repository/index';

const getOneUserPosts: RequestHandler = async (req, res) => {
    try {
        const userId: string = req.params.id;

        const post = await findAllPostsByUser(userId);

        return res.status(200).json({
            success: true,
            data: { post },
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

export default getOneUserPosts;
