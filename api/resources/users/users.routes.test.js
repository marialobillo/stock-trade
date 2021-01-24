let request = require('supertest');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let User = require('./users.model');
let app = require('../../../index').app;
let server = require('../../../index').server;
let config = require('../../../config');

let dummyUsers = [
    {
        username: 'Thomas',
        email: 'tomas@mail.com',
        password: 'tomas123'
    },
    {
        username: 'Jon',
        email: 'jon@mail.com',
        password: 'jon123'
    },
    {
        username: 'Kim',
        email: 'kim@mail.com',
        password: 'kim123'
    }
];

function userValidExist(user, done){
    User.find({ username: user.username})
        .then(users => {
            expect(users).toBeInstanceOf(Array);
            expect(users).toHaveLength(1)
            expect(users[0].username).toEqual(user.username)
            expect(users[0].email).toEqual(user.email)

            let equals = bcrypt.compareSync(user.password, users[0].password)
            expect(equals).toBeTruthy()
            done()
        })
        .catch(error => {
            done(error)
        })
}

describe('** Users **', () => {

    beforeEach((done) => {
        User.deleteMany({}, (error) => {
            done()
        })
    })

    afterAll(() => {
        server.close()
    })

    describe('GET /users', () => {

        test('If there is not Users, should returns an empty array', (done) => {
            request(app)
                .get('/users')
                .end((error, res) => {
                    expect(res.status).toBe(200)
                    expect(res.body).toBeInstanceOf(Array)
                    expect(res.body).toHaveLength(0)
                    done()
                })
        })

        test('If there is Users, should return them on an array', (done) => {
            Promise.all(dummyUsers.map(user => (new User(user)).save()))
                .then(users => {
                    request(app)
                        .get('/users')
                        .end((error, res) => {
                            expect(res.status).toBe(200)
                            expect(res.body).toBeInstanceOf(Array)
                            expect(res.body).toHaveLength(3)
                            done()
                        })
                })
        })
    })

    describe('POST /users', () => {



        test('Should create an user if is valid', (done) => {
            request(app)
              .post('/users')
              .send(dummyUsers[0])
              .end((error, res) => {
                expect(res.status).toBe(201)
                expect(typeof res.text).toBe('string')
                expect(res.text).toEqual('User created successfully')
                userValidExist(dummyUsers[0], done)
              })
          })
    
        test('Should fail try to register an already username registered', (done) => {
            Promise.all(dummyUsers.map(user => (new User(user)).save()))
                .then(users => {
                    request(app)
                        .post('/users')
                        .send({
                            username: 'Peter',
                            email: 'newpeter@mail.com',
                            password: 'hello123'
                        })
                        .end((error, res) => {
                            expect(res.status).toBe(409)
                            expect(typeof res.text).toBe('string')
                            done()
                        })
                })
        })
    
        test('Should fail try to register an already email registered', (done) => {
            Promise.all(dummyUsers.map(user => (new User(user)).save()))
                .then(users => {
                    request(app)
                        .post('/users')
                        .send({
                            username: 'New Peter',
                            email: 'jon@mail.com',
                            password: 'hello123'
                        })
                        .end((error, res) => {
                            expect(res.status).toBe(409)
                            expect(typeof res.text).toBe('string')
                            done()
                        })
                })
        })
    
        test('Shoul not create a user without username', (done) => {
            request(app)
                .post('/users')
                .send({
                    email: 'daniel@mail.com',
                    password: 'hello123'
                })
                .end((error, res) => {
                    expect(res.status).toBe(400)
                    expect(typeof res.text).toBe('string')
                    done()
                })
        })
    
        test('Should not create an user without password', (done) => {
            request(app)
            .post('/users')
            .send({
                username: 'Daniel',
                email: 'daniel@mail.com',
            })
            .end((error, res) => {
                expect(res.status).toBe(400)
                expect(typeof res.text).toBe('string')
                done()
            })
        })
    
        test('Should not create an user without email', (done) => {
            request(app)
            .post('/users')
            .send({
                username: 'Daniel',
                password: 'hello123'
            })
            .end((error, res) => {
                expect(res.status).toBe(400)
                expect(typeof res.text).toBe('string')
                done()
            })
        }) 
    
    })


    describe('POST /login', () => {

        test('Login should fail on request without username', (done) => {
            let bodyLogin = {
                password: 'hellohello'
            }
    
            request(app)
                .post('/users/login')
                .send(bodyLogin)
                .end((error, res) => {
                    expect(res.status).toBe(400)
                    expect(typeof res.text).toBe('string')
                    done()
                })
        })
    
        test('Login should failt on request without password', (done) => {
            let bodyLogin = {
                username: 'noone'
            }
    
            request(app)
                .post('/users/login')
                .send(bodyLogin)
                .end((error, res) => {
                    expect(res.status).toBe(400)
                    expect(typeof res.text).toBe('string')
                    done()
                })
    
    
        })
    
        test('Login should fail is the user is not registered', (done) => {
            let bodyLogin = {
                username: 'nouser',
                password: 'hellohello'
            }
    
            request(app)
                .post('/users/login')
                .send(bodyLogin)
                .end((error, res) => {
                    expect(res.status).toBe(400)
                    expect(typeof res.text).toBe('string')
                    done()
                })
        })
    
        test('Login should fail with registered user and wrong password', (done) => {
            let user = {
                username: 'peter',
                email: 'peter@mail.com',
                password: 'yellowdogs'
            }
    
            new User({
                username: user.username, 
                email: user.email,
                password: bcrypt.hashSync(user.password, 10)
            }).save().then(newUser => {
                request(app)
                    .post('/users/login')
                    .send({
                        username: user.username,
                        password: 'greenrice'
                    })
                    .end((error, res) => {
                        expect(res.status).toBe(400)
                        expect(typeof res.text).toBe('string')
                        done()
                    })
            })
            .catch(error => {
                done(error)
            })
        })
    
        test('User registered should have an JWT valid for login', (done) => {
            let user = {
                username: 'peter',
                email: 'peter@mail.com',
                password: 'yellowdogs'
            }
    
            new User({
                username: user.username,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10)
            }).save().then(newUser => {
                request(app)
                    .post('/users/login')
                    .send({
                        username: user.username, 
                        password: user.password
                    })
                    .end((error, res) => {
                        expect(res.status).toBe(200)
                        expect(res.body.token).toEqual(jwt.sign(
                            { id: newUser._id }, 
                            config.jwt.secret,
                            { expiresIn: config.jwt.expirantionTime }
                        ))
                    })
            }).catch(error => {
                done(error)
            })
        })
    
        test('Should got the same output about capitalization username', (done) => {
            let user = {
                username: 'peter',
                email: 'peter@mail.com',
                password: 'yellowdogs'
            }
    
            new User({
                username: user.username,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10)
            }).save().then(newUser => {
                request(app)
                    .post('/users/login')
                    .send({
                        username: 'PeTER',
                        password: user.password
                    })
                    .end((error, res) => {
                        expect(res.status).toBe(200)
                        expect(res.body.token).toEqual(jwt.sign(
                            { id: newUser._id }, 
                            config.jwt.secret,
                            { expiresIn: config.jwt.expirantionTime }
                        ))
                        done()
                    })
            })
            .catch(error => {
                done(error)
            })
        })
    })
    
})



