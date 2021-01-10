const express = require('express')
const holdingsRouter = require('./api/resources/holdings/holdings.routes')
const winston = require('winston')

// Winston for logs

const includeTimestamp = winston.format((info) => {
  info.message = `${new Date().toISOString()} ${info.message}`
  return info
});

const logger = winston.createLogger({
  transports: [
      new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
          )
      }),
      new winston.transports.File({
          level: 'info',
          handleExceptions: true, 
          format: winston.format.combine(
              includeTimestamp(),
              winston.format.simple()
          ),
          maxsize: 5120000, // 5 Mb
          maxFiles: 5,
          filename: `${__dirname}/../logs/application-logs.log`
      })
  ]
})

logger.info('Info')
logger.info(__dirname)


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/holdings', holdingsRouter)


app.get('/', (req, res) => {
  res.send('API de stock trade app')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

