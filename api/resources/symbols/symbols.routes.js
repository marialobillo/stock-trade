const express = require('express')
const logger = require('./../../../utils/logger')

const fs = require('fs')

const processErrors = require('../../libs/errorHandler')

const symbolsRouter = express.Router()

symbolsRouter.get('/', (req, res) => {
    let rawdata = fs.readFileSync('symbols.json');
    let symbols = JSON.parse(rawdata);
    res.status(200).json(symbols)
})

module.exports = symbolsRouter