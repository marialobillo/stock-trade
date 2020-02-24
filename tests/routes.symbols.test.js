const request = require('supertest');
const app = require('../server');

describe('Symbol Endpoints', () => {
  it('should create a new symbol', async () => {
    const res = await request(app)
      .post('/api/symbols')
      .send({
        symbolId: 1,
        companyName: 'Apple, Inc.',
        symbol: 'APPL',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('symbol');
  });

  it('should fetch a single symbol', async () => {
    const symbolId = 1;
    const res = await request(app).get(`/api/symbols/${symbolId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('symbol');
  });

  it('should fetch all symbols', async () => {
    const res = await request(app).get('/api/symbols');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('symbols');
    expect(res.body.symbols).toHaveLength(1);
  });

  it('should update a symbol', async () => {
    const res = await request(app)
      .put('/api/symbols/1')
      .send({
        symbolId: 1,
        companyName: 'Electrical Corportion',
        symbol: 'EEC',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('symbol');
    expect(res.body.symbol).toHaveProperty('symbol', 'EEC');
  });

//   it('should return status code 500 if db constraint is violated', async () => {
//     const res = await request(app)
//       .post('/api/posts')
//       .send({
//         title: 'test is cool',
//         content: 'Lorem ipsum',
//       });
//     expect(res.statusCode).toEqual(500);
//     expect(res.body).toHaveProperty('error');
//   });

  it('should delete a symbol', async () => {
    const res = await request(app).delete('/api/symbols/1');
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const symbolId = 1;
    const res = await request(app).get(`/api/symbols/${symbolId}`);
    expect(res.statusCode).toEqual(404);
  });
});