const request = require('supertest');
const app = require('../server');

describe('Users Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                name: "Jane",
                email: 'jane@mail.com',
                password: '123456',
                balance : 10000,
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    })

    it('should fetch a single user', async () => {
        const userId = 1;
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
    })

    it('should fetch all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('users');
        expect(res.body.users).toHaveLength(1);
    })

    it('should update a user', async () => {
        const res = await request(app)
          .put('/api/users/1')
          .send({
              userId: 1,
              name: 'Jhon Doe',
              email: "jhon@mail.com",
              password: '123123'
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('name', 'Jhon Doe');
    })

    // it('should return status code 500 if db constraint is violated', async () => {
    //     const res = await request(app)
    //       .post('/api/')
    //       .send({
    //         name: 'Jhon',
    //         email: 'jhon@mail.com',
    //         balance: 20000
    //       });
    //     expect(res.statusCode).toEqual(500);
    //     expect(res.body).toHaveProperty('error');
    // });

    it('should delete a user', async () => {
        const res = await request(app).delete('/api/users/1');
        expect(res.statusCode).toEqual(204);
    })

    it('should respond with status code 404 if resource is not found', async () => {
        const userId = 1;
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(404);
      });
})