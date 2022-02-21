import { RequestHandler } from 'express';
import { tPost } from '../../@types/types';
import { createPost } from '../repository/index';

const postCommunityPost: RequestHandler = async (req, res) => {
    const post: tPost = req.body;
    try {
        await createPost(post);
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

export default postCommunityPost;
