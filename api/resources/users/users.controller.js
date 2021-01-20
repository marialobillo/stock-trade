const User = require('./users.model')

const getUsers = () => {
    return User.find({})
}

const createUser = (user, hashedPassword) => {
    return new User({
        ...user, 
        password: hashedPassword
    }).save()
}

const userExists = (username, email) => {
    return new Promise((resolve, reject) => {
        User.find().or([{ 'username': username }, { 'email': email }])
        .then(users => {
            resolve(users.length > 0)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const getUser = ({  username: username, id: id }) => {
    if(username) return User.findOne({ username: username })
    
    if(id) return User.findById(id)
    
    throw new Error('For User we need you provide the username or id')
}


module.exports = {
    getUsers,
    userExists,
    getUser,
    createUser
}