import { RequestHandler } from 'express';
import { findAllPosts } from '../repository/index';

const getCommunityList: RequestHandler = async (req, res) => {
    try {
        const userId: string = req.params.userId;
        const post = await findAllPosts(userId);
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

export default getCommunityList;
