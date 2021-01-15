const Holding = require('./holdings.model')

const createHolding = (holding, owner) => {
  return new Holding({
    ...holding, 
    owner
  }).save()
}

const getHoldings = () => {
  return Holding.find({})
}

const getHoldingById = (id) => {
  return Holding.findById(id)
}

const deleteHolding = (id) => {
  return Holding.findByIdAndRemove(id)
}

module.exports = {
  createHolding,
  getHoldings,
  getHoldingById,
  deleteHolding
}