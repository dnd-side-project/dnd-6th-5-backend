import request from 'supertest';
import { expect, it, beforeAll, afterEach } from '@jest/globals';
import createServer from '../../../srcs/app';

import userJson from '../../data/user.json';
import error from '../../data/error.json';
import tJest from '../../../@types/types';

const user = userJson.newUser;
let app;
beforeAll(async () => {
    app = await createServer();
});
describe('PATCH /user/nickname', () => {
    it('200: nomal request', async () => {
        const response = await request(app).patch('/user/nickname').send(user);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.user.nickname).toBe(user.nickname);
        expect(response.body.data.user.id).toBe(parseInt(user.id));
    });

    it('400: id is not a numeric error ', async () => {
        const body = {
            id: 'not numeric id',
            nickname: user.nickname,
        };
        const response = await request(app).patch('/user/nickname').send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.numericId);
    });

    it('400: id does not exist error', async () => {
        const body = {
            id: '1000000',
            nickname: user.nickname,
        };
        const response = await request(app).patch('/user/nickname').send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.existUser);
    });

    it('400: validator error', async () => {
        const response = await request(app).patch('/user/nickname').send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.validator);
    });

    afterEach(async (done: tJest.DoneFn) => {
        done();
    });
});
