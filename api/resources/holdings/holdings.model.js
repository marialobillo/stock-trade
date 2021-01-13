const mongoose = require('mongoose')

const holdingSchema = new mongoose.Schema({
  company: { type: String, required: [true, 'Holding must have a company name']},
  symbol: { type: String, min: 3, requiredd: [true, 'Holding must have a symbol']},
  shares: { type: Number, default: 0, requiredd: [true, 'Holding must hava positive shares']},
  priceBuy: { type: Number, required: [true, 'Holding must have a priceBuy']},
  priceSell: { type: Number },
  dateBuy: { type: Date, default: Date.now },
  dateSell: { type: Date },
  isActive: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
})

module.exports = mongoose.model('holding', holdingSchema)