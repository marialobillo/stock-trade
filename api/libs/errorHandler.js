const mongoose = require('mongoose')
const logger = require("../../utils/logger")


exports.processErrors = (fn) => {
    return function(req, res, next){
        fn(req, res, next).catch(next)
    }
}

exports.processErrorsFromDB = (error, req, res, next) => {
    if(error instanceof mongoose.Error || error.name === 'MongoError'){
       logger.error('Error with mongoose: ', error)
       error.message = "An Error wiht database. Please contact with Administrator"
       error.status = 500  
    } 
    next(error)
} 

exports.errorsProduction = (error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
       message: error.message 
    })
}

exports.errorsDevelopment = (error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
       message: error.message,
       stack: error.stack || '' 
    })
}