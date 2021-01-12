const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')
const logger = require('./../../../utils/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersValidation = require('./users.validate').usersValidation
const loginValidation = require('./users.validate').loginValidation
const users = require('./../../../database').users

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.json(users)
})

usersRouter.post('/', usersValidation, (req, res) => {
  const newUser = req.body

  const index = _.findIndex(users, user => {
    return user.username = newUser.username || user.email === newUser.email
  })

  if(index !== -1){
    // Conflict
    logger.info('Username or email have already taken.')
    res.status(409).send('Username or email have already taken.')
    return
  }

  bcrypt.hash(newUser.password, 10, (error, hashedPassword) => {
    if(error){
      log.error('Error ocurred hashing password', error)
      // Internal Server Error
      res.status(500).send('Error ocurred')
      return
    }

    users.push({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
      balance: 10000,
      id: uuidv4()
    })

    res.status(201).send('User was created successfully')
  })

})


usersRouter.post('/login', loginValidation, (req, res) => {
  const userNoAuth = req.body 
  let index = _.findIndex(users, user => user.username === userNoAuth.username)

  if(index === -1){
    logger.info(`User ${userNoAuth.username} does not exist. No Authentication.`)
    res.status(400).send('Wrong credentials. User does not exist.')
    return
  }

  let hashedPassword = users[index].password
  bcrypt.compare(userNoAuth.password, hashedPassword, (error, equals) => {
    if(equals){
      // Generate and send token
      let token = jwt.sign(
        { id: users[index].id }, 
        'theredcatisblue', 
        { expiresIn: 86400 } 
      )
      logger.info(`User ${userNoAuth.username} completed authentication successfully.`)
      res.status(200).json({ token })
    } else {
      logger.info(`User ${userNoAuth.username} no authenticated. Wrong password.`)
      res.status(400).send('Wrong credentiasls. Be sure username and password are correct.')
    }
  })

})


module.exports = usersRouter