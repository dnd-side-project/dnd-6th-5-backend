import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import { getPolicyList } from '../../../srcs/controllers/index';
import httpMocks from 'node-mocks-http';
import { Policy } from '../../../srcs/entity/index';

import tJest from '../../../@types/types';
import policy from '../../data/policy.json';
import category from '../../data/category.json';

jest.mock('../../../srcs/entity/index');

// chained method 모킹
const mockPolicyEntity: tJest.mock = {
    createQueryBuilder: (Policy.createQueryBuilder as tJest.mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnValue(policy),
    }),
};

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('getPolicyList Controller GET', () => {
    beforeEach(async () => {
        req.query = category;
        await mockPolicyEntity.createQueryBuilder.mockClear();
    });

    it('should have getPolicyList function', () => {
        expect(typeof getPolicyList).toBe('function');
    });

    // 해당 컨트롤러에서 추가적인 결과값을 res담아 전달하고 있는지 확인합니다.
    it('should return 200 response code', async () => {
        // 컨트롤러를 실행합니다.
        await getPolicyList(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        const resJsonData = {
            success: true,
            data: { policy: policy },
        };

        await getPolicyList(req, res, next);

        expect(res._getJSONData()).toStrictEqual(resJsonData);
    });

    it('should call createQueryBuilder', async () => {
        getPolicyList(req, res, next);

        // Policy.createQueryBuilder()가 1번 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(await mockPolicyEntity.createQueryBuilder).toBeCalledTimes(1);
    });

    // invalid category 값이 req.query에 들어올 경우 에러처리 test code
    it('should handle invalid category error', async () => {
        req.query.category = 'invalid category';
        const error = Error('Invalid Category');

        await getPolicyList(req, res, next);
        expect(next).toBeCalledWith(error);
    });
});
