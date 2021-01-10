const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')
const Joi = require('joi')

const holdings = require('./../../../database').holdings
const holdingsRouter = express.Router()

const holdingSchema = Joi.object({
  company: Joi.string().max(100),
  symbol: Joi.string().max(6).uppercase().required(),
  shares: Joi.number().positive().required(),
  priceBuy: Joi.number().positive().precision(2).required(),
  priceSell: Joi.number().positive().precision(2),
  dateBuy: Joi.date().timestamp(),
  dateSell: Joi.date().timestamp(),
  isActive: Joi.boolean(),
  createdAt: Joi.date().timestamp(),
  updatedAt: Joi.date().timestamp()
})

const holdingValidate = (req, res, next) => {
  const data = req.body
  let validation = holdingSchema.validate(data, {
    abortEarly: false, 
    convert: false
  })
  console.log('Result validate', validation)
  if (validation.error === undefined){
    next()
  } else {
   
    let validationErrors = validation.error.details.reduce((acumulator, error) => {
      return acumulator + `[${error.message}]`;
    }, '')
    res.status(400).send('...error on holding validation')
  }
}

holdingsRouter.get('/', (req, res) => {
  res.json(holdings)
})

holdingsRouter.post('/', holdingValidate, (req, res) => {
  let newHolding = req.body
  
  newHolding.id = uuidv4()
  holdings.push(newHolding)
  // Created
  res.status(201).json(newHolding)
})

holdingsRouter.get('/:id', (req, res) => {
  for(let holding of holdings){
    if(holding.id == req.params.id){
      res.json(holding)
      return
    }
  }

  // Not found 
  res.status(404).send(`The holding with id ${res.params.id} does not exist.`)
})


holdingsRouter.get('/:id',(req, res) => {
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


holdingsRouter.get('/:id', (req, res) => {
  let index = _.findIndex(holdings, holding => holding.id == req.params.id)
  
  if(index === -1){
    res.status(404).send(`Holding with id ${req.params.id} does not exist.`)
    return 
  }

  let deleted = holdings.splice(index, 1)
  res.status(200).json(deleted)
})

module.exports = holdingsRouter
