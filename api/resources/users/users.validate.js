const Joi = require('joi')
const logger = require('./../../../utils/logger')

const userSchema =  Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).max(200).required(),
  email: Joi.string().email().required(),
  balance: Joi.number().positive().precision(2),
  createdAt: Joi.date().timestamp(),
  updatedAt: Joi.date().timestamp()
})


module.exports = (req, res, next) => {
  const data = req.body
  let validation = userSchema.validate(data, {
    abortEarly: false, 
    convert: false
  })
  if (validation.error === undefined){
    next()
  } else {
   
    
    logger.warn(`The next User was not validated: `, validation.error.details)
    res.status(400).send(`User data was not valid. 
    Username should be between 3 and 30 char long. 
    The password between 6 and 200 characters. 
    Please be sure about your email.`)
  } 
}