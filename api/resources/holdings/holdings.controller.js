const Holding = require('./holdings.model')

function createHolding(holding, owner){
  return new Holding({
    ...holding, 
    owner
  }).save()
}

function getHoldings(){
  return Holding.find({})
}

function getHoldingbyId(id){
  return Holding.findById(id)
}

module.exports = {
  createHolding,
  getHoldings,
  getHoldingbyId
}