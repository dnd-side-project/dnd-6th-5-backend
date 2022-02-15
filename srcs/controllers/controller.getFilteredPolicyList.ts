import { RequestHandler } from 'express';
import { findAllPolicy, findPolicyByCategory } from '../repository/index';

// 개발 진행 중
const getFilteredPolicyList: RequestHandler = async (req, res) => {
    const category: string = req.body.category;
    const id: number = req.body.id;
    const age: string = req.body.age; // if 제한없음 -> 포함 / else(만 19 ~ 34세) -> strip 해서 age 범위면 포함 아니면 배제
    const maritalStatus: string = req.body.maritalStatus; // 같거나 null만 포함
    const workStatus: string = req.body.workStatus; // 같거나 null만 포함
    const companyScale: string = req.body.companyScale; // null은 포함, 비어있지 않으면 요청값이 문자열에 포함돼있는 거만 포함
    const medianIncome: string = req.body.medianIncome; // 요청값보다 숫자가 큰것과 null만 포함
    const annualIncome: string = req.body.annualIncome; // 요청값보다 숫자가 큰것과 null만 포함
    const asset: string = req.body.asset; // 같거나 null만 포함
    const isHouseOwner: string = req.body.isHouseOwner; // 같거나 null만 포함
    const hasHouse: string = req.body.hasHouse; // 같거나 null만 포함

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
                data: policy,
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

export default getFilteredPolicyList;
