import request from 'supertest';
import { expect, it, beforeAll, afterEach } from '@jest/globals';
import createServer from '../../../srcs/app';

import error from '../../data/error.json';
import postJson from '../../data/posts.json';
import tJest, { postByUserArray } from '../../../@types/types';

let app;
const resData = postJson as postByUserArray;
beforeAll(async () => {
    app = await createServer();
});
describe('GET /user/:id/post', () => {
    it('200: nomal request', async () => {
        const response = await request(app).get('/user/24/post');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.post).toStrictEqual(resData.byUser);
    });

    it('400: id is not a numeric error ', async () => {
        const response = await request(app).get('/user/Invalid value/post');

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.numericId);
    });

    it('400: id does not exist error', async () => {
        const response = await request(app).get('/user/10000/post');

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.existUser);
    });
    afterEach(async (done: tJest.DoneFn) => {
        done();
    });
});
