const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')
const logger = require('./../../../utils/logger')
const bcrypt = require('bcrypt')

const usersValidate = require('./users.validate')
const users = require('./../../../database').users

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.json(users)
})

usersRouter.post('/', userValidate, (req, res) => {
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
      balance: 10000
    })

    res.status(201).send('User was created successfully')
  })

})