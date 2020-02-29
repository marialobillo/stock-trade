'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Holdings', [{
        userId: 1,
        company: 'Apple Inc.',
        symbol: 'APPL',
        shares: 20,
        priceBuy: 170.56,
        priceSell: null,
        isActive: true,
        dateBuy: new Date(),
        dateSell: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        company: 'Ebay Inc.',
        symbol: 'EBAY',
        shares: 30,
        priceBuy: 123.44,
        priceSell: 160.99,
        isActive: false,
        dateBuy: new Date(),
        dateSell: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Holdings', null, {});
    
  }
};
