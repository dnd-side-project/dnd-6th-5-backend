import { RequestHandler } from 'express';
import { Post } from '../entity';
import { findOnePostById } from '../repository/index';

const deletePost: RequestHandler = async (req, res) => {
    const id: string = req.params.id;
    try {
        const post = await findOnePostById(id);
        if (post) {
            Post.delete({ id: parseInt(id) });
            return res.status(200).json({
                success: true,
                data: { message: '게시글 삭제 완료' },
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

export default deletePost;
