const _ = require('underscore')
const logger = require('./../../utils/logger')
const users = require('./../../database').users
const bcrypt = require('bcrypt')
const passportJWT = require('passport-jwt')

let jwtOptions = {
  secretOrKey: 'theredcatisblue',
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = new passportJWT.Strategy(jwtOptions, (jwtPayload, next) => {
  let index = _.findIndex(users, user => user.id === jwtPayload.id)

  if(index === -1){
    logger.info(`JWT not valid user ${users[index].username} does not exist. No Authentication.`)
    next(null, false)
  } else {
    logger.info(`User ${users[index].username} got a valid token. Auth completed.`)
    next(null, {
      username: users[index].username,
      id: users[index].id
    })
  }
})

