const request = require('supertest');
const app = require('../server');

describe('Holdings Endpoints', () => {
  it('should create a new holding', async () => {
    const res = await request(app)
      .post('/api/holdings')
      .send({
        userId: 2,
        symbolId: 1,
        isActive: true,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('holding');
  });

  it('should fetch a single holding', async () => {
    const holdingId = 1;
    const res = await request(app).get(`/api/holdings/${holdingId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('holding');
  });

  it('should fetch all holdings', async () => {
    const res = await request(app).get('/api/holdings');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('holdings');
    expect(res.body.holdings).toHaveLength(1);
  });

  it('should update a holding', async () => {
    const res = await request(app)
      .put('/api/holdings/1')
      .send({
        userId: 2,
        symbolId: 4,
        isActive: true,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('holding');
    expect(res.body.holding).toHaveProperty('isActive', true);
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

  it('should delete a holding', async () => {
    const res = await request(app).delete('/api/holdings/1');
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const holdingId = 1;
    const res = await request(app).get(`/api/holdings/${holdingId}`);
    expect(res.statusCode).toEqual(404);
  });
});