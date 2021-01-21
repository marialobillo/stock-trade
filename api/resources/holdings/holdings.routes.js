const express = require('express')
const { v4: uuidv4 } = require('uuid')
const _ = require('underscore')
const logger = require('./../../../utils/logger')
const passport = require('passport')

const holdingsValidate = require('./holdings.validate')
const Holding = require('./holdings.model')
const HoldingController = require('./holdings.controller')
const processErrors = require('../../libs/errorHandler').processErrors
const { HoldingNoExists, UserNoOwner} = require('./holdings.error')


const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const holdingsRouter = express.Router()

const idValidation = (req, res, next) => {
  const id = req.params.id 
  if(id.match(/^[a-fA-F0-9]{24}$/) === null){
    res.status(400).send(`The id ${id} given is not correct.`)
    return
  } 
  next()
} 


holdingsRouter.get('/', processErrors((req, res) => {
  return HoldingController.getHoldings()
    .then(holdings => {
      res.json(holdings)
    })
}))

holdingsRouter.post('/', [jwtAuthenticate, holdingsValidate], processErrors((req, res) => {
  return HoldingController.createHolding(req.body, req.user.username)
    .then(holding => {
      logger.info("Holding created added to the wallet", holding)
      res.status(201).json(holding)
    })
}))

holdingsRouter.get('/:id', idValidation, processErrors((req, res) => {
  const id = req.params.id 
  return HoldingController.getHoldingById(id)
    .then(holding => {
      if(!holding) throw new HoldingNoExists(`The holding with id ${id} does not exist.`)
      res.json(holding)
    })
}))


holdingsRouter.put('/:id', [jwtAuthenticate, holdingsValidate], processErrors(async (req, res) => {
  let id = req.params.id 
  let requestUser = req.user.username 
  let holdingUpdated 

  holdingUpdated = await HoldingController.getHoldingById(id)

  if(!holdingUpdated){
    throw new HoldingNoExists(`Holding id ${id} does not exist.`)
  }

  if(holdingUpdated.owner !== requestUser){
    log.warn(`User ${requestUser} is not the owner of holding ${id}. No update possible.`)
    throw new UserNoOwner(`You are not the owner of the holding ${id}. Only can change your holdings.`)
  }

  HoldingController.updateHolding(id, req.body, requestUser)
    .then(holding => {
      res.status(200).json(holding)
      logger.info(`Holding id ${id} was successfully updated`, holding.toObject())
    })
}))


holdingsRouter.delete('/:id', [jwtAuthenticate, idValidation] , processErrors(async (req, res) => {
  let id = req.params.id 
  let holdingToDelete

  holdingToDelete = await HoldingController.getHoldingById(id)

  if(!holdingToDelete){
    logger.info(`Holding id ${id} does not exist. Nothing to delete.`)
    throw new HoldingNoExists(`Holding with id ${id} does not exist.`)
  }

  let userAuthenticated = req.user.username
  if(holdingToDelete.owner !== userAuthenticated){
    logger.info(`User ${userAuthenticated} is not the owner of ${id} holding.`)
    throw new UserNoOwner(`You are not the holding owner. Only can DELETE your own holdings.`)
  }

  let deletedHolding = await HoldingController.deleteHolding(id)
  logger.info(`Product id ${id} was deleted.`)
  res.status(200).json(deletedHolding)    
}))

module.exports = holdingsRouter
