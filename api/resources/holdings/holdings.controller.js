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

module.exports = {
  createHolding,
  getHoldings
}