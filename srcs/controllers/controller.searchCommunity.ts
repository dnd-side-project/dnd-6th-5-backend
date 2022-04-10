import { RequestHandler } from 'express';
import { findPostsByKeyword } from '../repository/index';

const searchCommunity: RequestHandler = async (req, res) => {
    const query: string = req.query.query as string;
    const userId: string = req.params.userId;
    try {
        const post = await findPostsByKeyword(query, userId);
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

export default searchCommunity;
