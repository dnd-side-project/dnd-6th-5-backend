import request from 'supertest';
import { expect, it, beforeAll, afterEach } from '@jest/globals';
import createServer from '../../srcs/app';

import newUser from '../data/new-user.json';
import tJest from '../../@types/types';

let app;
beforeAll(async () => {
    app = await createServer();
});

it('PATCH /api/products', async () => {
    const response = await request(app).patch('/user/nickname').send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.nickname).toBe(newUser.nickname);
    expect(response.body.data.user.id).toBe(parseInt(newUser.id));
});

afterEach(async (done: tJest.DoneFn) => {
    done();
});
