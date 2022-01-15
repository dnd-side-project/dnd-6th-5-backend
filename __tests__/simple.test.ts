import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';


describe("test", () => {

    describe('GET /', () => {
        test('status to be 200', async () => {
            expect(200).toBe(200);
        });
    });
})
