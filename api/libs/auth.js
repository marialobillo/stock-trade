const _ = require('underscore')
const logger = require('./../../utils/logger')
const users = require('./../../database').users
const bcrypt = require('bcrypt')

module.exports = (username, password, done) => {
  
  let index = _.findIndex(users, user => user.username == username)

  if(index === -1){
    logger.info(`User ${username} does not exist. No Authentication.`)
    done(null, false)
    return
  }

  let hashedPassword = users[index].password
  bcrypt.compare(password, hashedPassword, (error, equals) => {
    if(equals){
      logger.info(`User ${username} authentication completed.`)
      done(null, true)
    } else {
      logger.info(`User ${username} no authenticated. Wrong password.`)
      done(null, false)
    }
  })
}