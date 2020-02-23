'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Holdings', [
      {
      userId: 1,
      symbolId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      symbolId: 1,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('Holdings', null, {});
  }
};
