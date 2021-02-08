const Joi = require('joi')
const logger = require('./../../../utils/logger')

const holdingSchema = Joi.object({
  company: Joi.string().max(100),
  symbol: Joi.string().max(6).uppercase().required(),
  shares: Joi.number().positive().required(),
  priceBuy: Joi.number().positive().precision(2).required(),
  priceSell: Joi.number().positive().precision(2),
  dateBuy: Joi.string().max(50),
  dateSell: Joi.string().max(50),
  isActive: Joi.boolean(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
  owner: Joi.string().max(100)
})

module.exports = (req, res, next) => {
  const data = req.body
  let validation = holdingSchema.validate(data, {
    abortEarly: false, 
    convert: false
  })
  if (validation.error === undefined){
    next()
  } else {
   
    let validationErrors = validation.error.details.reduce((acumulator, error) => {
      return acumulator + `[${error.message}]`;
    }, '')
    console.log(validationErrors)
    logger.warn(`The next holding was not validated: `, req.body, validationErrors)
    res.status(400).send('...error on holding validation')
  }
}

