const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    user_id: mongoose.ObjectId,
    amount: { type: Number , default: 10000 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, 
})

module.exports = mongoose.model('balance', balanceSchema)