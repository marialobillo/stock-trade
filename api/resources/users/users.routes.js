const express = require('express')
const logger = require('./../../../utils/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersValidation = require('./users.validate').usersValidation
const loginValidation = require('./users.validate').loginValidation
const config = require('./../../../config')
const userController = require('./users.controller')
const { UserDataInUse, IncorrectCredentials} = require('./users.error')

const usersRouter = express.Router()

function bodyToLowercase(req, res, next) {
  req.body.username && (req.body.username = req.body.username.toLowerCase())
  req.body.email && (req.body.email = req.body.email.toLowerCase())
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

usersRouter.post('/', [usersValidation, bodyToLowercase], (req, res) => {
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


usersRouter.post('/login', [loginValidation, bodyToLowercase], async (req, res) => {
  const userNoAuthenticated = req.body 
  let userRegistered 

  try {
    userRegistered = await userController.getUser({
      username: userNoAuthenticated.username
    })
  } catch (error) {
    logger.error(`Error on finding the user ${userNoAuthenticated.username} for login`)
    res.status(500).send('Error on login process')
    return
  }


  if(!userRegistered){
    logger.info(`User ${userNoAuthenticated.username} does not exist.`)
    throw new IncorrectCredentials();
  }

  let correctPassword 
  correctPassword = await bcrypt.compare(userNoAuthenticated.password, userRegistered.password)

  if(correctPassword){
      // Generate and send token
      let token = jwt.sign(
          { id: userRegistered.id }, 
          config.jwt.secret, 
          { expiresIn: config.jwt.expirationTime })
      logger.info(`User ${userNoAuthenticated.username} completed authentication.`)
      res.status(200).json({ token })
  } else {
      logger.info(`User ${userNoAuthenticated.username} does not authenticated auth. Password not correct.`);
      throw new IncorrectCredentials();
  }
  

})


module.exports = usersRouter