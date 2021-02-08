const Holding = require('./holdings.model')

const createHolding = (holding, owner) => {
  return new Holding({
    ...holding, 
    owner
  }).save()
}

const getHoldings = (requestedUser) => {
  return Holding.find({ owner: requestedUser, isActive: true})
}

const getHoldingById = (id) => {
  return Holding.findById(id)
}

const updateHolding = (id, holding, username) => {
  return Holding.findOneAndUpdate({ _id: id }, {
    ...holding, 
    owner: username
  }, {
    new: true //
  })
}

const deleteHolding = (id) => {
  return Holding.findByIdAndRemove(id)
}

module.exports = {
  createHolding,
  getHoldings,
  getHoldingById,
  deleteHolding,
  updateHolding
}