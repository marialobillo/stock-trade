const request = require('supertest');
const app = require('../server');

describe('Transactions Endpoints', () => {
  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .send({
        holdingId: 1,
        typeTransaction: 'buy',
        shares: 20,
        stockPrice: 140.83
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('transaction');
  });

  it('should fetch a single transaction', async () => {
    const transactionId = 1;
    const res = await request(app).get(`/api/transactions/${transactionId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('transaction');
  });

  it('should fetch all transactions', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('transactions');
    expect(res.body.transactions).toHaveLength(1);
  });

  it('should update a transaction', async () => {
    const res = await request(app)
      .put('/api/transactions/1')
      .send({
        holdingId: 1,
        typeTransaction: 'sell',
        shares: 15,
        stockPrice: 130.22
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('transaction');
    expect(res.body.transaction).toHaveProperty('shares', 15);
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

  it('should delete a transaction', async () => {
    const res = await request(app).delete('/api/transactions/1');
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const transactionId = 1;
    const res = await request(app).get(`/api/transactions/${transactionId}`);
    expect(res.statusCode).toEqual(404);
  });
});