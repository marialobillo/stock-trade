const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')
const logger = require('./../../../utils/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersValidation = require('./users.validate').usersValidation
const loginValidation = require('./users.validate').loginValidation
const users = require('./../../../database').users
const config = require('./../../../config')
const userController = require('./users.controller')

const usersRouter = express.Router()

const convertToLowercase = (req, res, next) => {
  req.body.username && (req.body.username = req.body.username.toLowerCase())
  res.body.email && (req.body.email = req.body.email.toLowerCase())
  next()
} 

usersRouter.get('/', (req, res) => {
  userController.getUsers()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      logger.error('Error trying to get all Users')
      res.sendStatus(500)
    })
})

usersRouter.post('/', [usersValidation, convertToLowercase], (req, res) => {
  const newUser = req.body

  userController.userExists(newUser.username, newUser.email)
    .then(userExists => {
      if(userExists){
        logger.warn(`Email ${newUser.email} or username ${newUser.username} already exist.`)
        res.status(409).send('Email or username are already taken.')
        return
      }

      bcrypt.hash(newUser.password, 10, (error, hashedPassword) => {
        if(error){
          logger.error('Error trying to get hashed password', error)
          res.status(500).send('Error on creating the user')
          return
        }

        userController.createUser(newUser, hashedPassword)
          .then(newUser => {
            res.status(201).send('User created successfully')
          })
          .catch(error => {
            logger.error('Error trying to create an user', error)
            res.status(500).send('Error on creating the user')
          })

      })

    })
    .catch(error => {
      logger.error(`Error trying to verify user ${newUser.username} with email ${newUser.email} already exists.`)
      res.status(500).send('Error trying to create a new user.')
    })

  

})


usersRouter.post('/login', [loginValidation, convertToLowercase], async (req, res) => {
  const userNoAuthenticated = req.body 
  const userRegistered 

  try {
    userRegistered = await userController.getUser({
      username: userNoAuthenticated.username
    })
  } catch (error) {
    logger.error(`Error on finding the user ${userNoAuthenticated.username} for login`)
    res.status(500).send('Error on login process')
  }



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
         config.jwt.secret, 
        { expiresIn: config.jwt.expirationTime } 
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