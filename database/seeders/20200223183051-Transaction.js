'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      {
      holdingId: 1,
      typeTransaction: 'buy',
      shares: 10,
      stockPrice: 134.55,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      holdingId: 2,
      typeTransaction: 'sell',
      shares: 20,
      stockPrice: 205.55,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Transactions', null, {});
  
  }
};
