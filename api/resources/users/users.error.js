

class UserDataInUse extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Email or username already in use.'
        this.status = 409
        this.name = 'UserDataInUse'
    }
}

class IncorrectCredentials extends Error {
    constructor(message){
        super(message);
        this.message = message || 'Incorrect Credentials. Please check them out'
        this.status = 400;
        this.name = 'IncorrectCredentials';
    }
}

module.exports = {
    UserDataInUse,
    IncorrectCredentials
}