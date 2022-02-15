import { RequestHandler } from 'express';
import { findOnePolicyById } from '../repository/index';

const getPolicyDetail: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const policy = await findOnePolicyById(id);
        if (policy) {
            return res.status(200).json({
                success: true,
                data: policy,
            });
        } else {
            throw new Error('No matching policy in db');
        }
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
