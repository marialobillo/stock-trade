const express = require('express')
const _ = require('underscore')

const holdings = require('./../../../database').holdings
const holdingsRouter = express.Router()



holdingsRouter.route('/')
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

holdingsRouter.route('/:id') 
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
      res.status(404).send(`The holding with id ${id} does not exist.`)
    }
  })
  .delete((req, res) => {
    let index = _.findIndex(holdings, holding => holding.id == req.params.id)
    
    if(index === -1){
      res.status(404).send(`Holding with id ${req.params.id} does not exist.`)
      return 
    }

    let deleted = holdings.splice(index, 1)
    res.status(200).json(deleted)
  })

  module.exports = holdingsRouter
