import { RequestHandler } from 'express';
import { findAllPosts } from '../repository/index';

const getCommunityList: RequestHandler = async (req, res) => {
    try {
        const posts = await findAllPosts();
        return res.status(200).json({
            success: true,
            data: { posts },
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

export default getCommunityList;