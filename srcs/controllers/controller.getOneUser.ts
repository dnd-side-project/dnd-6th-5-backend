import { RequestHandler } from 'express';
import { nextTick } from 'process';
import { findOneUserById } from '../repository/index';

const getOneUser: RequestHandler = async (req, res, next) => {
    try {
        const userId: string = req.params.id;

        const user = await findOneUserById(userId);

        if (user === undefined) throw Error('This is a user id that does not exist.');

        return res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error: any) {
        next(error);
    }
};

export default getOneUser;
