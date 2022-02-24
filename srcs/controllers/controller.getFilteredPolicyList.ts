import { RequestHandler } from 'express';
import { convertForFilterData } from '../lib/index';
import { findFilterPolicy } from '../repository/index';

const getFilteredPolicyList: RequestHandler = async (req, res) => {
    try {
        console.log('1');
        const userInfo = req.query;
        console.log(userInfo);
        const FilterData = await convertForFilterData(userInfo);
        const policy = await findFilterPolicy(FilterData);

        return res.status(200).json({
            success: true,
            data: { policy },
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

export default getFilteredPolicyList;
