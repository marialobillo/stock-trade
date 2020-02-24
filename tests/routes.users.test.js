const request = require('supertest');
const app = require('../server');

describe('Users Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "Jane",
                email: 'jane@mail.com',
                password: '123456',
                balance : 10000,
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    })
})