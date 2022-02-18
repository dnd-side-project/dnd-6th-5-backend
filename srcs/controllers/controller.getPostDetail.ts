import { RequestHandler } from 'express';
import { findOnePostById, findAuthorByPostId, findCommentsByPostId } from '../repository/index';

const getPostDetail: RequestHandler = async (req, res) => {
    const id: string = req.params.id;
    try {
        const post = await findOnePostById(id);
        console.log('111');
        const author = await findAuthorByPostId(id);
        console.log('222');
        const comments = await findCommentsByPostId(id);
        if (id && post) {
            return res.status(200).json({
                success: true,
                data: { post, author, comments },
            });
        } else {
            throw new Error('No matching post in db');
        }
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

export default getPostDetail;
