const Joi = require('joi')
const logger = require('./../../../utils/logger');

const balanceSchema = Joi.object({
    user_id: Joi.object().required(),
    amount: Joi.number().precision(2),
    createdAt: Joi.date().timestamp(),
    updatedAt: Joi.date().timestamp()
});

module.exports = (req, res, next) => {
    const data = req.body 
    let validation = balanceSchema.validate(data, {
        abortEarly: false, 
        convert: fase
    });
    if(validation.error === undefined){
        next()
    } else {

        let validationErrors = validation.error.details.reduce((acumulator, error) => {
            return acumulator + `[${error.message}]`;
        });
        console.log(validationErrors);
        logger.warn('The update of the balance was validated.', req.body, validationErrors);
        res.status(400).send('...error on holding validation');
    }
}

