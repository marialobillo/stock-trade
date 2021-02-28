const Balance = require('./balances.model');

const getBalanceById = (id) => {
    return Balance.findById(id);
}

const createBalance = (balance, user_id) => {
    return new Balance({
        ...balance, 
        user_id 
    }).save()
}

const updateBalance = (id, balance, user_id) => {
    return Balance.findOneAndUpdate({ _id: id }, {
        ...balance, 
        user_id: user_id
    }, {
        new: true
    });
}

const getBalanceByUserId = (user_id) => {
    return Balance.find({'user_id': user_id});
} 

const deleteBalance = (id) => {
    return Balance.findByIdAndDelete(id);
}

module.exports = {
    createBalance,
    updateBalance,
    getBalanceByUserId,
    deleteBalance,
    getBalanceById
}