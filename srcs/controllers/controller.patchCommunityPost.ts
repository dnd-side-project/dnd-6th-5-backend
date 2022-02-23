import { RequestHandler } from 'express';
import { tPost } from '../../@types/types';
import validatorAge from '../lib/date.lib';
import { updateOnePostById } from '../repository/index';

const patchCommunityPost: RequestHandler = async (req, res) => {
    const postId: string = req.params.id;
    const post: tPost = req.body;
    try {
        if (validatorAge(req.body.age) === false)
            throw Error(`The range of age values is '19010101-20211231' 입니다`);

        await updateOnePostById(postId, post);
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

export default patchCommunityPost;
