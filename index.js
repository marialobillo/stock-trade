const express = require('express')
const holdingsRouter = require('./api/resources/holdings/holdings.routes')
const morgan = require('morgan')
const logger = require('./utils/logger')

const passport = require('passport')
// Authentication basic password and usernem
const BasicStrategy = require('passport-http').BasicStrategy

passport.use(new BasicStrategy(
  (username, password, done) => {
    if(username.valueOf() === 'maria' && password.valueOf() === 'pass12345'){
      return done(null, true)
    } else {
      return done(null, false)
    }
  }
))

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


app.get('/', passport.authenticate('basic', { session: false }), (req, res) => {
  res.send('API de stock trade app')
})

app.listen(3000, () => {
  logger.info('Listening on port 3000')
})

