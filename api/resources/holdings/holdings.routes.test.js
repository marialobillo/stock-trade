let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let request = require('supertest')
let mongoose = require('mongoose')

let config = require('../../../config')
let Holding = require('./holdings.model')
let Users = require('../users/users.model')
let app = require('../../../index').app
let server = require('../../../index').server

let holdingAlreadySavedDB = {
  company: "Tikki Inc.",
  symbol: "TIKK",
  shares: 120,
  priceBuy: 34.00,
  owner: "Peter",
  isActive: true
}

let newHolding = {
    company: "Green Apple Inc.",
    symbol: "GRAP",
    shares: 78,
    priceBuy: 25.40,
    owner: "Peter",
    isActive: true
}

let idNoExist = '5ab8dbcc6539f91c2288b0c1'

let testUser = {
  username: 'Thomas',
  email: 'tom@mail.com',
  password: 'pass123'
}

let authToken
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInP5cCI6IkpXVCJ9.eyJpZCI6IjVhYmIzMjJiZGQ2NTRhN2RiZmNjNGUsMCIsImlhdCI6MTTyMjE1MTk3OSwiZXhwIjoxNTIyMjM4Mzc5fQ.AAtAAAAkYuAAAy9O-AA0sAkcAAAAqfXskJZxhGJuTIk'

function getToken(done) {
  // Antes de este bloque de tests creamos un usuario y obtenemos
  // su JWT token. Esto nos permitirá testear rutas que requieren autenticación.
  User.deleteMany({}, error => {
    if (error) done(error)
    request(app)
      .post('/users')
      .send(testUser)
      .end((error, res) => {
        expect(res.status).toBe(201)
        request(app)
          .post('/users/login')
          .send({
            username: testUser.username,
            password: testUser.password
          })
          .end((error, res) => {
            expect(res.status).toBe(200)
            authToken = res.body.token
            done()
          })
      })
  })
}

describe('** Holdings **', () => {
  
  beforeEach((done) => {
    Holding.deleteMany({}, error => { 
      done()
    })   
  })

  afterAll(async () => {
    server.close()
    await mongoose.disconnect()
  })

  describe('GET /holding/:id', () => {
    it('Should return 400 if we try to get an invalid holding', done => {
      request(app)
        .get('/holding/123')
        .end((error, res) => {
          expect(res.status).toBe(400)
          done()
        })      
    })
    
    it('Should return 404 for a holding does not exist', done => {
      request(app)
        .get(`/productos/${idNoExist}`)
        .end((error, res) => {
          expect(res.status).toBe(404)
          done()
        })
    })

    it('Should return a holding that it exists successfully', done => {
      Holding(holdingAlreadySavedDB).save()
        .then(holding => {
          request(app)
            .get(`/holdings/${holding._id}`)
            .end((error, res) => {
              expect(res.status).toBe(200)
              expect(res.body).toBeInstanceOf(Object)
              expect(res.body.company).toEqual(holding.company)
              expect(res.body.symbol).toEqual(holding.symbol)
              expect(res.body.shares).toEqual(holding.shares)
              expect(res.body.priceBuy).toEqual(holding.priceBuy)
              done()
            })
        })
        .catch(error => {
          done(error)
        })
    })
  })

  describe('POST /holdings', () => {

    beforeAll(getToken)

    it('Should create a holding if the user has a valid token and the holding is valid', done => {
      request(app)
        .post('/holdings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newHolding)
        .end((error, res) => {
            expect(res.status).toBe(201)
            expect(res.body.company).toEqual(newHolding.company)
            expect(res.body.symbol).toEqual(newHolding.symbol)
            expect(res.body.shares).toEqual(newHolding.shares)
            expect(res.body.priceBuy).toEqual(newHolding.priceBuy)
            expect(res.body.owner).toEqual(testUser.username)
            done()
        })
    })

    it('Should return 401 if the user got an invalid auth token', done => {
      request(app)
        .post('/holdings')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(newHolding)
        .end((error, res) => {
          expect(res.status).toBe(401)
          done()
        })
    })

    it('Should not create a holding without a symbol', done => {
      request(app)
        .post('/holding')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
            company: newHolding.company,
            shares: newHolding.shares,
            priceBuy: newHolding.priceBuy,
            owner: newHolding.owner,
            isActive: newHolding.isActive
        })
        .end((error, res) => {
          expect(res.status).toBe(400)
          done()
        })
    })

    it('Should not create a holding without a number of shares', done => {
        request(app)
          .post('/holding')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
              company: newHolding.company,
              symbol: newHolding.symbol,
              priceBuy: newHolding.priceBuy,
              owner: newHolding.owner,
              isActive: newHolding.isActive
          })
          .end((error, res) => {
            expect(res.status).toBe(400)
            done()
          })
      })

      it('Should not create a holding without a priceBuy', done => {
        request(app)
          .post('/holding')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
              company: newHolding.company,
              symbol: newHolding.symbol,
              shares: newHolding.shares,
              owner: newHolding.owner,
              isActive: newHolding.isActive
          })
          .end((error, res) => {
            expect(res.status).toBe(400)
            done()
          })
      })

  
  })



  describe('DELETE /holdings/:id', () => {

    let idHoldingExists

    beforeAll(getToken)

    beforeEach(done => {
      Holding.deleteMany({}, (error) => { 
        if (error) done(error)
        Holding(holdingAlreadySavedDB).save()
          .then(holding => {
            idHoldingExists = holding._id
            done()
          })
          .catch(error => {
            done(error)
          })
      })
    })

    it('Should return 400 if we trying to get a holding with an invalid id', done => {
      request(app)
        .delete('/holdings/123')
        .set('Authorization', `Bearer ${authToken}`)
        .end((error, res) => {
          expect(res.status).toBe(400)
          done()
        })
    })

    it('Should return 404 if we try to delete a holding it does not exist', done => {
      request(app)
        .delete(`/holdings/${idNoExist}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((error, res) => {
          expect(res.status).toBe(404)
          done()
        })
    })

    it('Si el usuario no provee un token de autenticación válido, debería retornar 401', done => {
      request(app)
        .delete(`/holdings/${idHoldingExists}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .end((error, res) => {
          expect(res.status).toBe(401)
          done()
        })
    })

    it('Should return 401 is the user is not the holding owner', done => {
      Holding({
        company: "Red Dragon Inc.",
        symbol: "RDDG",
        shares: 90,
        priceBuy: 102.40,
        owner: "Martha",
        isActive: true
      }).save()
        .then(holding => {
          request(app)
            .delete(`/holdings/${holding._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .end((error, res) => {
              expect(res.status).toBe(401)
              expect(res.text.includes('You are not the owner of holding with id')).toBe(true)
              done()
          })
        })
        .catch(error => {
          done(error)
        })
    })


    it('Should delete the holding if the user auth is the owner and the token is valid', done => {
      request(app)
        .delete(`/holdings/${idHoldingExists}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((error, res) => {
            expect(res.status).toBe(200)
            expect(res.body.company).toEqual(holdingAlreadySavedDB.company)
            expect(res.body.symbol).toEqual(holdingAlreadySavedDB.symbol)
            expect(res.body.shares).toEqual(holdingAlreadySavedDB.shares)
            expect(res.body.priceBuy).toEqual(holdingAlreadySavedDB.priceBuy)
            expect(res.body.owner).toEqual(testUser.username)
            Holding.findById(idHoldingExists)
                .then(holding => {
                    expect(holding).toBeNull()
                    done()
                })
                .catch(error => {
                    done(error)
                })
        })
    })

  })

})