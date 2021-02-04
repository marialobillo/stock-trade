const _ = require('underscore')
const bcrypt = require('bcrypt')
const passportJWT = require('passport-jwt')

const logger = require('./../../utils/logger')
const config = require('./../../config')
const userController = require('./../resources/users/users.controller')


let jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = new passportJWT.Strategy(jwtOptions, (jwtPayload, next) => {
  userController.getUser({ id: jwtPayload.id })
    .then(user => {
      if(!user){
        logger.info(`JWT not valid token, user ${user.username} does not exist. No Authentication.`)
        next(null, false)
        return
      }

      logger.info(`User ${user.username} got a valid token. Authentication completed.`)
      next(null, {
        username: user.username,
        id: user.id,
        balance: user.balance,
        email: user.email
      })
    })
    .catch(error => {
      logger.error('Error on token validation')
      next(error)
    })
  
})

