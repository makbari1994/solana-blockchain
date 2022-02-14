const { server } = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('block Endpoints', () => {

    it('GET /show solana block data', async () => {
        const res = await requestWithSupertest.get('/solana/getData');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('result')
    });


});