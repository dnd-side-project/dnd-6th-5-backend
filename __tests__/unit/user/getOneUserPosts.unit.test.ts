import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import { getOneUserPosts } from '../../../srcs/controllers/index';
import httpMocks from 'node-mocks-http';
import { User } from '../../../srcs/entity/index';

import tJest, { postByUserArray } from '../../../@types/types';
import userJson from '../../data/user.json';
import postJson from '../../data/posts.json';

jest.mock('../../../srcs/entity/index');

const mockFindOneUser: tJest.mock = User.findOne;
// User.findOne()를 모킹합니다.
const mockUserEntity: tJest.mock = {
    createQueryBuilder: (User.createQueryBuilder as tJest.mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockReturnThis(),
    }),
};
const user = userJson.testUser;
const post = postJson as postByUserArray;

let req, res, next;
beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

// 먼저 함수의 존재 유무부터 test합니다.
describe('getOneUser Controller Create', () => {
    beforeEach(async () => {
        req.params.id = '24';
        await mockFindOneUser.mockClear();
        await mockUserEntity.createQueryBuilder.mockClear();
    });

    // 해당 컨트롤러가 존재하는지 확인하는 testcode
    it('should have patchUserNickname function', () => {
        expect(typeof getOneUserPosts).toBe('function');
    });

    it('should call User.findOne()', async () => {
        const numId = parseInt(req.params.id);
        await mockFindOneUser.mockReturnValue(user);

        await getOneUserPosts(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(await mockFindOneUser).toBeCalledWith({ id: numId });
    });

    it('should return 200 response code', async () => {
        // 컨트롤러를 실행합니다.
        await mockFindOneUser.mockReturnValue(user);

        await getOneUserPosts(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        const resJson = {
            success: true,
            data: { post: post.byUser },
        };
        // 컨트롤러를 실행합니다.
        await mockFindOneUser.mockReturnValue(user);
        await mockUserEntity
            .createQueryBuilder()
            .select()
            .leftJoin()
            .leftJoin()
            .where()
            .addSelect()
            .addSelect()
            .getRawMany.mockReturnValue(post.byUser);

        await getOneUserPosts(req, res, next);

        // newProduct를 인자로 User.findOne()가 실행되었는지 확인합니다.
        expect(res._getJSONData()).toStrictEqual(resJson);
    });

    // User.createQueryBuilder()를 모킹하여 호출이 되는지 확인하는 test code입니다.
    it('should call createQueryBuilder', async () => {
        // 컨트롤러를 실행합니다.
        await getOneUserPosts(req, res, next);

        // newProduct를 인자로 User.createQueryBuilder()가 1번 실행되었는지 확인합니다.
        expect(res.statusCode).toBe(200);
        expect(mockUserEntity.createQueryBuilder).toBeCalledTimes(1);
    });

    it('should handle id does not exist error', async () => {
        // 컨트롤러를 실행합니다.
        const errorMsg = {
            success: false,
            error: {
                code: 'Error',
                message: 'This is a user id that does not exist.',
            },
        };
        const rejectedPromise = Promise.reject(errorMsg);
        await mockFindOneUser.mockReturnValue(rejectedPromise);

        await getOneUserPosts(req, res, next);
        expect(next).toBeCalledWith(errorMsg);
    });

    it('should handle id is not a numberic error', async () => {
        // 컨트롤러를 실행합니다.
        req.params.id = 'invalid id';
        const error = Error('Please enter a numeric character for the id value.');

        await getOneUserPosts(req, res, next);
        expect(next).toBeCalledWith(error);
    });
});
