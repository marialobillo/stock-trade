

class UserDataInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Email or username already in use.'
        this.status = 409
        this.name = 'UserDataInUse'
    }
}

class WrongCredentials extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Wrong Credentials. Please check them out'
        this.status = 400
        this.name = 'WrongCredentials'
    }
}

module.exports = {
    UserDataInUse,
    WrongCredentials
}