import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import { getOneUser } from '../../../srcs/controllers/index';
import httpMocks from 'node-mocks-http';
import { User } from '../../../srcs/entity/index';

import tJest from '../../../@types/types';
import userJson from '../../data/user.json';

jest.mock('../../../srcs/entity/index');

// User.findOne()를 모킹합니다.
const mockFindOneUser: tJest.mock = User.findOne;
const user = userJson.newUser;

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

// 먼저 함수의 존재 유무부터 test합니다.
describe('getOneUser Controller Create', () => {
    beforeEach(async () => {
        req.params = user;
        await mockFindOneUser.mockClear();
    });

    // 해당 컨트롤러가 존재하는지 확인하는 testcode
    it('should have patchUserNickname function', () => {
        expect(typeof getOneUser).toBe('function');
    });

    // User.findOne()를 모킹하여 호출이 되는지 확인하는 test code입니다.
    it('should call User.findOne()', async () => {
        // 컨트롤러를 실행합니다.
        const numId = parseInt(user.id);

        await mockFindOneUser.mockReturnValue(user);

        await getOneUser(req, res, next);

        // newProduct를 인자로 User.findOne()가 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(await mockFindOneUser).toBeCalledWith({ id: numId });
    });

    // User.findOne()를 모킹하여 해당 컨트롤러에서 추가적인 결과값을 res담아 전달하고 있는지 확인합니다.
    it('should return 200 response code', async () => {
        // 컨트롤러를 실행합니다.
        await mockFindOneUser.mockReturnValue(user);
        await getOneUser(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        const resJsonData = {
            success: true,
            data: { user: user },
        };

        await mockFindOneUser.mockReturnValue(user);
        await getOneUser(req, res, next);

        expect(res._getJSONData()).toStrictEqual(resJsonData);
    });

    // 존재하지 않는 user_id값이 req.params에 들어올 경우 에러처리 test code
    it('should handle id does not exist error', async () => {
        // 컨트롤러를 실행합니다.
        const errorMsg = {
            success: false,
            error: {
                code: 'Error',
                message: 'This user_id does not exist.',
            },
        };
        const rejectedPromise = Promise.reject(errorMsg);
        await mockFindOneUser.mockReturnValue(rejectedPromise);

        await getOneUser(req, res, next);
        expect(next).toBeCalledWith(errorMsg);
    });

    // req.params.id값이 숫자형 문자열이 아닐경우 발생하는 error testcode입니다.
    it('should handle id is not a numberic error', async () => {
        // 컨트롤러를 실행합니다.
        req.params.id = 'invalid id';
        const error = Error('Please enter a numeric character for the id value.');

        await getOneUser(req, res, next);
        expect(next).toBeCalledWith(error);
    });
});
