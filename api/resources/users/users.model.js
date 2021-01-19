const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, minlength: 1, unique: true, dropDups: true, required: [true, 'User must has a username'] },
    password: { type: String, minlength: 1, unique: true, dropDups: true, required: [true, 'User mus has a password'] },
    email: { type: String, minlength: 1, required: [true, 'User must has an email'] },
    balance: { type: Number , default: 10000 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, 
})

module.exports = mongoose.model('user', userSchema)