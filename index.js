const express = require('express')
const holdingsRouter = require('./api/resources/holdings/holdings.routes')


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