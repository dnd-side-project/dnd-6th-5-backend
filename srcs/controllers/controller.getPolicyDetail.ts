import { RequestHandler } from 'express';
import { findOnePolicyById } from '../repository/index';

const getPolicyDetail: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const policy = await findOnePolicyById(id);
        return res.status(200).json({
            success: true,
            data: {
                policy,
            },
        });
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

export default getPolicyDetail;
