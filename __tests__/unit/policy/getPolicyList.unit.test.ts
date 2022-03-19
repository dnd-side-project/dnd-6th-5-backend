import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import { getPolicyList } from '../../../srcs/controllers/index';
import httpMocks from 'node-mocks-http';
import { Policy } from '../../../srcs/entity/index';

import tJest from '../../../@types/types';
import policy from '../../data/policy.json';

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
        // expect(res._isEndCalled()).toBeTruthy();
    });
});
