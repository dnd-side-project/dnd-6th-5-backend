import request from 'supertest';
import { expect, it, beforeAll } from '@jest/globals';
import createServer from '../../../srcs/app';

import result from '../../data/policyDetail.json';
import error from '../../data/error.json';
import tJest from '../../../@types/types';

const policy_id = 1;

let app;
beforeAll(async () => {
    app = await createServer();
});
describe('GET /policy/:id', () => {
    it('200: normal request', async () => {
        const response = await request(app).get(`/policy/${policy_id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.policy).toStrictEqual(result);
    });

    it('404: id does not exist error', async () => {
        const response = await request(app).get(`/policy/1000000`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toStrictEqual(error.existPolicy);
    });

    afterEach(async (done: tJest.DoneFn) => {
        done();
    });
});
