import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import patchUserNickname from '../../srcs/controllers/controller.patchUserNickname';
import httpMocks from 'node-mocks-http';
import newUser from '../data/new-user.json';
import { User } from '../../srcs/entity/index';
import tJest from '../../@types/types';

jest.mock('../../srcs/entity/index');

// User.findOne()를 모킹합니다.
const mockFindOneUser = User.findOne as tJest.Mock;

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

// 먼저 함수의 존재 유무부터 test합니다.
describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newUser;
    });

    // 해당 컨트롤러가 존재하는지 확인하는 testcode
    it('should have createProduct function', () => {
        expect(typeof patchUserNickname).toBe('function');
    });

    // User.findOne()를 모킹하여 호출이 되는지 확인하는 test code입니다.
    it('should call ProductModel.create', async () => {
        // 컨트롤러를 실행합니다.
        await mockFindOneUser.mockReturnValue(newUser);
        patchUserNickname(req, res, next);

        // newProduct를 인자로 User.findOne()가 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(await mockFindOneUser).toBeCalledWith({ id: parseInt(newUser.id) });
    });
});
