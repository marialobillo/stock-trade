const request = require('supertest');
const app = require('../server');

describe('Holdings Endpoints', () => {

    it('should create a new holding', async () => {
        const res = await request(app)
            .post('/api/holdings')
            .send({
                userId: 1,
                company: "Apple Inc.",
                symbol: "APPL",
                shares: "20",
                priceBuy: "170.56",
                priceSell: null,
                isActive: true,
                dateBuy: "2020-02-29T16:33:52.729Z",
                dateSell: null,
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('holding');
    })

    it('should fetch a single holding', async () => {
        const holdingId = 1;
        const res = await request(app).get(`/api/holdings/byId/${holdingId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('holding');
    })

    it('should fetch all holdings', async () => {
        const res = await request(app).get('/api/holdings');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('holdings');
        expect(res.body.holdings).toHaveLength(1);
    })

    it('should update a holding', async () => {
        const res = await request(app)
          .put('/api/holdings/1')
          .send({
            userId: 1,
            company: "Apple Inc.",
            symbol: "APPL",
            shares: "40",
            priceBuy: "120.56",
            priceSell: null,
            isActive: true,
            dateBuy: "2020-01-01T16:33:52.729Z",
            dateSell: null,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('holding');
        expect(res.body.holding).toHaveProperty('shares', '40');
    })


    it('should delete a holding', async () => {
        const res = await request(app).delete('/api/holdings/1');
        expect(res.statusCode).toEqual(204);
    })

    it('should respond with status code 404 if resource is not found', async () => {
        const holdingId = 10;
        const res = await request(app).get(`/api/holdings/byId/${holdingId}`);
        expect(res.statusCode).toEqual(404);
      });
})