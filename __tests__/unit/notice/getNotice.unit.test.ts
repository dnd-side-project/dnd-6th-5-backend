import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import getNotice from '../../../srcs/controllers/controller.getNotice';
import httpMocks from 'node-mocks-http';
import { Notice } from '../../../srcs/entity/index';

import allNotice from '../../data/body.json';
import tJest from '../../../@types/types';

jest.mock('../../../srcs/entity/index');

// chained method 모킹
const mockNoticeEntity: tJest.mock = {
    createQueryBuilder: (Notice.createQueryBuilder as tJest.mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnValue(allNotice),
    }),
};

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('getNotice Controller Create', () => {
    beforeEach(async () => {
        await mockNoticeEntity.createQueryBuilder.mockClear();
    });

    it('should have getNotice function', () => {
        expect(typeof getNotice).toBe('function');
    });

    // 해당 컨트롤러에서 추가적인 결과값을 res담아 전달하고 있는지 확인합니다.
    it('should return 200 response code', async () => {
        // 컨트롤러를 실행합니다.
        await getNotice(req, res, next);

        // newProduct를 인자로 User.findOne()가 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        const resJsonData = {
            success: true,
            data: { notice: allNotice },
        };

        await getNotice(req, res, next);

        expect(res._getJSONData()).toStrictEqual(resJsonData);
    });

    it('should call createQueryBuilder', async () => {
        // 컨트롤러를 실행합니다.
        await getNotice(req, res, next);

        // newProduct를 인자로 User.createQueryBuilder()가 1번 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(await mockNoticeEntity.createQueryBuilder).toBeCalledTimes(1);
    });
});
