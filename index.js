const express = require('express')

const app = express()

const holdings = [
  {
    id: '1234123',
    company: 'APPLE Inc.',
    symbol: 'APPL',
    shares: 20,
    priceBuy: 203.33,
    priceSell: 0,
    isActive: true,
  },
  {
    id: '1234124',
    company: 'EBAY Inc.',
    symbol: 'EBAY',
    shares: 10,
    priceBuy: 140.33,
    priceSell: 0,
    isActive: true,
  },
  {
    id: '1234125',
    company: 'Facebook Inc.',
    symbol: 'FCBK',
    shares: 40,
    priceBuy: 403.33,
    priceSell: 0,
    isActive: true,
  }
]

app.route('/holdings')
  .get((req, res) => {
    res.json(holdings)
  })

app.get('/holdings/:id', (req, res) => {
  for(let holding of holdings){
    if(holding.id == req.params.id){
      res.json(holding)
      return
    }
  }
})


app.get('/', (req, res) => {
  res.send('API de stock trade app')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})