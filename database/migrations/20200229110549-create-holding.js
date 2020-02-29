'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Holdings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      shares: {
        type: Sequelize.DECIMAL
      },
      priceBuy: {
        type: Sequelize.DECIMAL
      },
      priceSell: {
        type: Sequelize.DECIMAL
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      dateBuy: {
        type: Sequelize.DATE
      },
      dateSell: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Holdings');
  }
};