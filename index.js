const express = require('express')
const holdingsRouter = require('./api/resources/holdings/holdings.routes')
const morgan = require('morgan')
const logger = require('./utils/logger')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim())
  }
}))


app.use('/holdings', holdingsRouter)


app.get('/', (req, res) => {
  res.send('API de stock trade app')
})

app.listen(3000, () => {
  logger.info('Listening on port 3000')
})

