const express = require('express')
const _ = require('underscore')
const logger = require('./../../../utils/logger')
const passport = require('passport')

const balanceValidate = require('./balances.validate')
const Balance = require('./balance.model')
const BalanceController = require('./balances.controller')
const processErrors = require('./../../libs/errorHandler').processErrors;
const { BalanceNoExists, UserNoOwner } = require('./balances.error');

const jwtAuthenticate = passport.authenticate('jwt', { session: false })
const balanceRouter = express.Router();

const idValidation = (req, res, next) => {
    const id = req.params.id 
    if(id.match(/^[a-fA-F0-9]{24}$/) === null){
        res.status(400).send('The id given is not correct')
        return
    }
    next()
}

balanceRouter.get('/', [jwtAuthenticate], processErrors(async (req, res) => {
    let requestUserId = req.user.id 
    console.log('The user is requesting the balances', requestUserId);
    return BalanceController.getBalanceByUserId(requestUserId)
        .then(balance => {
            res.json(balance)
        })
}))

balanceRouter.post('/', [jwtAuthenticate, balanceValidate], processErrors((req, res) => {
    return BalanceController.createBalance(req.body, req.user.id)
        .then(balance => {
            logger.info('Balance created added to the wallet', balance);
            res.status(201).json(balance)
        })
}));
