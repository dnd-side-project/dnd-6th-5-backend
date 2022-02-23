import { RequestHandler } from 'express';
import { findAllNotice } from '../repository/index';

const getNotice: RequestHandler = async (req, res) => {
    try {
        const notice = await findAllNotice();

        return res.status(200).json({
            success: true,
            data: { notice },
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

export default getNotice;
