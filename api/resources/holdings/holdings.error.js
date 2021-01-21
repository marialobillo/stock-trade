class HoldingNoExists extends Error {
    constructor(message){
        super(message)
        this.message = message || 'Holding Does not Exist.'
        this.status = 404
        this.name = 'HoldingNoExists'
    }
}

class UserNoOwner extends Error {
    constructor(message){
        super(message)
        this.message = message || 'You are not the holding owner.'
        this.status = 401
        this.name = 'UserNotOwner'
        
    }
}

module.exports = {
    HoldingNoExists,
    UserNoOwner
}