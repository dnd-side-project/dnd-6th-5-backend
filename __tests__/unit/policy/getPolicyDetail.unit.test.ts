import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import { getPolicyDetail } from '../../../srcs/controllers/index';
import httpMocks from 'node-mocks-http';
import { Policy } from '../../../srcs/entity/index';

import tJest from '../../../@types/types';
import policy from '../../data/policyDetail.json';

jest.mock('../../../srcs/entity/index');

const mockPolicyEntity: tJest.mock = {
    createQueryBuilder: (Policy.createQueryBuilder as tJest.mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockReturnThis(),
    }),
};

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

// 먼저 함수의 존재 유무부터 test합니다.
describe('getOneUser Controller Create', () => {
    beforeEach(async () => {
        await mockPolicyEntity.createQueryBuilder.mockClear();
    });

    // 해당 컨트롤러가 존재하는지 확인하는 testcode
    it('should have getOneUser function', () => {
        expect(typeof getPolicyDetail).toBe('function');
    });

    it('should return 200 response code', async () => {
        // 컨트롤러를 실행합니다.
        req.params.id = 1;
        await getPolicyDetail(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        req.params.id = 1;

        const resJsonData = {
            success: true,
            data: { policy: policy },
        };

        await mockPolicyEntity
            .createQueryBuilder()
            .select()
            .leftJoin()
            .where()
            .addSelect()
            .getRawOne.mockReturnValue(policy);

        await getPolicyDetail(req, res, next);

        expect(res._getJSONData()).toStrictEqual(resJsonData);
    });

    // 존재하지 않는 policy_id값이 req.params에 들어올 경우 에러처리 test code
    it('should handle id does not exist error', async () => {
        req.params.id = -1;

        await mockPolicyEntity
            .createQueryBuilder()
            .select()
            .leftJoin()
            .where()
            .addSelect()
            .getRawOne.mockReturnValue();

        const errorMsg = {
            success: false,
            error: {
                code: 'Error',
                message: 'No matching policy in db',
            },
        };

        await getPolicyDetail(req, res, next);
        expect(res._getJSONData()).toStrictEqual(errorMsg);
    });
});
