const User = require('./users.model')

const getUsers = () => {
    return User.find({})
}


module.exports = {
    getUsers
}