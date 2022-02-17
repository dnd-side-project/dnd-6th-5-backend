import { RequestHandler } from 'express';
import { updateOneUserNicknameById } from '../repository/repository.user';

const patchUserNickname: RequestHandler = async (req, res) => {
    try {
        const id: string = req.body.id;
        const nickname: string = req.body.nickname;
        const user = await updateOneUserNicknameById(id, nickname);
        return res.status(200).json({
            success: true,
            data: { user },
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

export default patchUserNickname;
