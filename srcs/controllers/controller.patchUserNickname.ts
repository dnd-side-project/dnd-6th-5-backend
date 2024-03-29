import { RequestHandler } from 'express';
import { updateOneUserNicknameById } from '../repository/index';

const patchUserNickname: RequestHandler = async (req, res, next) => {
    try {
        const id: string = req.body.id;
        const nickname: string = req.body.nickname;
        const user = await updateOneUserNicknameById(id, nickname);

        return res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error: any) {
        next(error);
    }
};

export default patchUserNickname;
