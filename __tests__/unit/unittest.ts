import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import patchUserNickname from '../../srcs/controllers/controller.patchUserNickname';
import httpMocks from 'node-mocks-http';
import newUser from '../data/new-user.json';
import { User } from '../../srcs/entity/index';

import tJest from '../../@types/types';
// const mockedTypeorm = typeorm as jest.Mocked<typeof typeorm>;

jest.mock('../../srcs/entity/index');

// User.findOne()를 모킹합니다.
const mockFindOneUser: tJest.mock = User.findOne;
// chained method 모킹
const mockEntity: tJest.mock = {
    createQueryBuilder: (User.createQueryBuilder as tJest.mock).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockReturnThis(),
    }),
};

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

// 먼저 함수의 존재 유무부터 test합니다.
describe('Product Controller Create', () => {
    beforeEach(async () => {
        req.body = newUser;
        await mockFindOneUser.mockClear();
        await mockEntity.createQueryBuilder.mockClear();
    });

    // 해당 컨트롤러가 존재하는지 확인하는 testcode
    it('should have createProduct function', () => {
        expect(typeof patchUserNickname).toBe('function');
    });

    // User.findOne()를 모킹하여 호출이 되는지 확인하는 test code입니다.
    it('should call FindOneUser', async () => {
        // 컨트롤러를 실행합니다.
        const numId = parseInt(newUser.id);

        await mockFindOneUser.mockReturnValue(newUser);

        patchUserNickname(req, res, next);

        // newProduct를 인자로 User.findOne()가 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(await mockFindOneUser).toBeCalledWith({ id: numId });
    });

    // User.createQueryBuilder()를 모킹하여 호출이 되는지 확인하는 test code입니다.
    it('should call createQueryBuilder', async () => {
        // 컨트롤러를 실행합니다.
        patchUserNickname(req, res, next);

        // newProduct를 인자로 User.createQueryBuilder()가 1번 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(await mockEntity.createQueryBuilder).toBeCalledTimes(1);
    });
});
