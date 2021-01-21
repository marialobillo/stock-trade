const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

const holdingsRouter = require('./api/resources/holdings/holdings.routes')
const usersRouter = require('./api/resources/users/users.routes')
const logger = require('./utils/logger')
const authJWT = require('./api/libs/auth')
const config = require('./config')
const errorHandler = require('./api/libs/errorHandler')

// Authentication basic password and username
passport.use(authJWT)

// Database
mongoose.connect('mongodb://127.0.0.1:27017/holdings', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
mongoose.connection.on('error', () => {
  logger.error('Fail mongodb connection')
  process.exit(1)
})

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

app.use(errorHandler.processErrorsFromDB)
if(config.environment === 'prod'){
  app.use(errorHandler.errorsProduction)
} else {
  app.use(errorHandler.errorsDevelopment)
}


app.listen(config.port, () => {
  logger.info('Listening on port 3000')
})

