import { RequestHandler } from 'express';
import { findOneUserByNickname } from '../repository/index';

const checkNicknameDuplicate: RequestHandler = async (req, res) => {
    try {
        const nickname: string = req.query.nickname as string;

        const user = await findOneUserByNickname(nickname);

        if (user) {
            throw Error('This user nickname already exists.');
        } else {
            return res.status(200).json({
                success: true,
                data: { message: 'Available user nickname.' },
            });
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

export default checkNicknameDuplicate;
