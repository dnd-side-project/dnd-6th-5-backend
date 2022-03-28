import request from 'supertest';
import { expect, it, beforeAll } from '@jest/globals';
import createServer from '../../../srcs/app';

import category from '../../data/category.json';
import result from '../../data/policy.json';
import error from '../../data/error.json';

let app;
beforeAll(async () => {
    app = await createServer();
});
describe('GET /policy', () => {
    it('200: normal request', async () => {
        const response = await request(app).get('/policy').query(category);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.policy).toStrictEqual(result);
    });

    it('400: invalid category error', async () => {
        const query = {
            category: 'invalid!!',
        };
        const response = await request(app).get('/policy').query(query);

        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual(error.invalidCategory);
    });
});
