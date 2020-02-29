'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('Investment', [{
        userId: 2,
        company: 'Apple Inc.',
        symbol: 'APPL',
        priceBuy: '134.23',
        priceSell: null,
        isActive: true,
        dateBuy: now(),
        dateSell: null,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Investmnet', null, {});
  }
};
