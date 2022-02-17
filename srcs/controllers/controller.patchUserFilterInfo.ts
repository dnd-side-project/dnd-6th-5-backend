import { RequestHandler } from 'express';
import { findOneUserById, updateOneUserFilterById } from '../repository/index';
import { setUserFilter } from '../lib/index';
import { tUser } from '../../@types/types';

const patchUserFilterInfo: RequestHandler = async (req, res) => {
    try {
        const id: string = req.body.id;
        const user = await findOneUserById(id);

        const newUser = await setUserFilter(user as tUser, req.body);
        await updateOneUserFilterById(newUser);

        return res.status(200).json({
            success: true,
            data: newUser,
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

export default patchUserFilterInfo;
