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

describe('GET /user/:id', () => {
    it('200: nomal request', async () => {
        const response = await request(app).get(`/user/${user.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.user.nickname).toBe(user.nickname);
        expect(response.body.data.user.id).toBe(parseInt(user.id));
    });

    it('400: id is not a numeric error ', async () => {
        const response = await request(app).get(`/user/id`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.numericId);
    });

    it('400: id does not exist error', async () => {
        const response = await request(app).get(`/user/1000000`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.existUser);
    });

    afterEach(async (done: tJest.DoneFn) => {
        done();
    });
});
