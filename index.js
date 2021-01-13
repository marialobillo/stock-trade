const express = require('express')
const holdingsRouter = require('./api/resources/holdings/holdings.routes')
const usersRouter = require('./api/resources/users/users.routes')
const morgan = require('morgan')
const logger = require('./utils/logger')
const authJWT = require('./api/libs/auth')
const config = require('./config')

const passport = require('passport')
// Authentication basic password and username
passport.use(authJWT)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim())
  }
}))



app.use(passport.initialize())

app.use('/holdings', holdingsRouter)
app.use('/users', usersRouter)


app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  logger.info('User ->',req.user)
  res.send('API de stock trade app')
})

app.listen(config.port, () => {
  logger.info('Listening on port 3000')
})

