const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const holdings = [
  {
    id: '123123',
    company: 'APPLE Inc.',
    symbol: 'APPL',
    shares: 20,
    priceBuy: 203.33,
    priceSell: 0,
    isActive: true
  },
  {
    id: '123124',
    company: 'EBAY Inc.',
    symbol: 'EBAY',
    shares: 10,
    priceBuy: 140.33,
    priceSell: 0,
    isActive: true
  },
  {
    id: '123125',
    company: 'Facebook Inc.',
    symbol: 'FCBK',
    shares: 40,
    priceBuy: 403.33,
    priceSell: 0,
    isActive: true
  }
]

app.route('/holdings')
  .get((req, res) => {
    res.json(holdings)
  })
  .post((req, res) => {
    let newHolding = req.body
    console.log('Holding ---> ', newHolding)
    if(!newHolding.symbol || !newHolding.shares || !newHolding.priceBuy){
      
      // Bad request
      res.status(400).send('Symbol, shares, and priceBuy are requirements.')
      return 
    }

    newHolding.id = uuidv4()
    holdings.push(newHolding)
    // Created
    res.status(201).json(newHolding)
  })

app.route('/holdings/:id') 
  .get((req, res) => {
    for(let holding of holdings){
      if(holding.id == req.params.id){
        res.json(holding)
        return
      }
    }

    // Not found 
    res.status(404).send(`The holding with id ${res.params.id} does not exist.`)
  })
  .put((req, res) => {
    let id = req.params.id 
    let udpatedHolding = req.body 

    if(!udpatedHolding.symbol || !udpatedHolding.shares || !udpatedHolding.priceBuy){
      
      // Bad request
      res.status(400).send('Symbol, shares, and priceBuy are requirements.')
      return 
    }

    let index = _.findIndex(holdings, holding => holding.id == id)

    if(index !== -1){
      udpatedHolding.id = id
      holdings[index] = udpatedHolding
      res.status(200).json(udpatedHolding)
    } else {
      res.status(400).send(`The holding with id ${id} does not exist.`)
    }
  })


app.get('/', (req, res) => {
  res.send('API de stock trade app')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})