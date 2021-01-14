const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')
const logger = require('./../../../utils/logger')
const passport = require('passport')

const holdingsValidate = require('./holdings.validate')
const Holding = require('./holdings.model')
const HoldingController = require('./holdings.controller')

const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const holdings = require('./../../../database').holdings
const holdingsRouter = express.Router()

const idValidation = (req, res, next) => {
  const id = req.params.id 
  if(id.match(/^[a-fA-F0-9]{24}$/) === null){
    res.status(400).send(`The id ${id} given is not correct.`)
    return
  } 
  next()
} 


holdingsRouter.get('/', (req, res) => {
  HoldingController.getHoldings()
    .then(holdings => {
      res.json(holdings)
    })
    .catch(error => {
      res.status(500).send('Error reading the holdings on database.')
    })
})

holdingsRouter.post('/', [jwtAuthenticate, holdingsValidate], (req, res) => {
  HoldingController.createHolding(req.body, req.user.username)
    .then(holding => {
      logger.info("Holding created added to the wallet", holding)
      res.status(201).json(holding)
    })
    .catch(error => {
      logger.error('Holding could not be created.', error)
      res.status(500).send('We could not create the holding')
    })
})

holdingsRouter.get('/:id', idValidation, (req, res) => {
  const id = req.params.id 
  HoldingController.getHoldingbyId(id)
    .then(holding => {
      if(!holding){
        res.status(404).send(`The holding with id ${res.params.id} does not exist.`)

      } else {
        res.json(holding)
      }
    })
    .catch(error => {
      logger.error(`Exception trying to find holding id ${id}`, error)
      res.status(500).send(`Error trying to find holding id ${id}.`)
    })

})


holdingsRouter.put('/:id', [jwtAuthenticate, holdingsValidate], (req, res) => {
  let holdingUpdated = {
    ...req.body,
    id: req.params.id, 
    owner: req.user.username
  }


  let index = _.findIndex(holdings, holding => holdingUpdated.id == id)

  if(index !== -1){
    if(holdings[index].owner !== holdingsValidate.owner){
      logger.info(`User ${req.user.username} is not the owner of ${holdingUpdated.id} holding.`)
      res.status(401).send(`You are not the holding owner. Only can SEE your own holdings.`)
      return
    }
    holdings[index] = holdingUpdated
    logger.info(`Product id ${holdingUpdated} was updated.`)
    res.status(200).json(holdingUpdated)
  } else {
    res.status(404).send(`The holding with id ${holdingUpdated.id} does not exist.`)
  }
})


holdingsRouter.get('/:id', jwtAuthenticate, (req, res) => {
  let index = _.findIndex(holdings, holding => holding.id == req.params.id)
  
  if(index === -1){
    logger.warn(`Holding id ${id} does not exist. Nothing to delete.`)
    res.status(404).send(`Holding with id ${req.params.id} does not exist.`)
    return 
  }

  if(holdings[index].owner !== req.user.username){
    logger.info(`User ${req.user.username} is not the owner of ${holdings[index].id} holding.`)
    res.status(401).send(`You are not the holding owner. Only can DELETE your own holdings.`)
    return
  }

  logger.info(`Product id ${req.params.id} was deleted.`)

  let deleted = holdings.splice(index, 1)
  res.status(200).json(deleted)
})

module.exports = holdingsRouter
