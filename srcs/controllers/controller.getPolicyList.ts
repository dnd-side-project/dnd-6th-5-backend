import { RequestHandler } from 'express';
import { findAllPolicy, findPolicyByCategory } from '../repository/index';

const getPolicyList: RequestHandler = async (req, res) => {
    const category = req.query.category as string;
    try {
        let policy;

        if (['전체', '주거', '금융'].includes(category)) {
            if (category === '전체') {
                policy = await findAllPolicy();
            } else {
                policy = await findPolicyByCategory(category);
            }

            return res.status(200).json({
                success: true,
                data: {
                    policy,
                },
            });
        } else {
            throw new Error('Invalid Category');
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

export default getPolicyList;
