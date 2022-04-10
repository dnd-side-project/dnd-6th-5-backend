import { RequestHandler } from 'express';
import { findOnePostById, findCommentsByPostId } from '../repository/index';

const getPostDetail: RequestHandler = async (req, res) => {
    const id: string = req.params.id;
    const userId: string = req.params.userId;
    try {
        const post = await findOnePostById(id);
        const comment = await findCommentsByPostId(id, userId);
        if (post) {
            return res.status(200).json({
                success: true,
                data: { post, comment },
            });
        } else {
            throw new Error('No matching post in db');
        }
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

export default getPostDetail;
