import { RequestHandler } from 'express';
import { convertForFilterData, validatorAge, setUserFilter } from '../lib/index';
import { findFilterPolicy, findOneUserById, updateOneUserFilterById } from '../repository/index';
import { tUser } from '../../@types/types';

const postFilteredPolicyList: RequestHandler = async (req, res) => {
    try {
        const id: string = req.body.id;
        if (validatorAge(req.body.age) === false)
            throw Error(`The range of age values is '19010101-20211231'`);

        const user = await findOneUserById(id);

        const newUser = await setUserFilter(user as tUser, req.body);
        await updateOneUserFilterById(newUser);

        const userInfo = req.body;
        const FilterData = await convertForFilterData(userInfo);
        const policy = await findFilterPolicy(FilterData);

        return res.status(200).json({
            success: true,
            data: { newUser, policy },
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

export default postFilteredPolicyList;
