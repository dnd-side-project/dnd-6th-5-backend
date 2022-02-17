import { RequestHandler } from 'express';
import { findOneUserById } from '../repository/index';

const getOneUser: RequestHandler = async (req, res) => {
    try {
        const userId: string = req.params.id;
        const user = await findOneUserById(userId);

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

export default getOneUser;
