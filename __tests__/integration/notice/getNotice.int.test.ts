import request from 'supertest';
import { expect, it, beforeAll, afterEach } from '@jest/globals';
import createServer from '../../../srcs/app';

import result from '../../data/result.json';
import tJest from '../../../@types/types';

let app;
beforeAll(async () => {
    app = await createServer();
});

describe('GET /notice', () => {
    it('200: nomal request', async () => {
        const response = await request(app).get(`/notice`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.notice).toStrictEqual(result);
    });

    afterEach(async (done: tJest.DoneFn) => {
        done();
    });
});
