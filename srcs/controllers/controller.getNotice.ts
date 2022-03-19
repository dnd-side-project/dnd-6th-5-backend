import { RequestHandler } from 'express';
import { findAllNotice } from '../repository/index';

const getNotice: RequestHandler = async (req, res, next) => {
    try {
        const notice = await findAllNotice();

        return res.status(200).json({
            success: true,
            data: { notice },
        });
    } catch (error: any) {
        next(error);
    }
};

export default getNotice;
