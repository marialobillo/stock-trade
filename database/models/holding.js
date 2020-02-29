'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holding = sequelize.define('Holding', {
    userId: DataTypes.INTEGER,
    company: DataTypes.STRING,
    symbol: DataTypes.STRING,
    shares: DataTypes.DECIMAL,
    priceBuy: DataTypes.DECIMAL,
    priceSell: DataTypes.DECIMAL,
    isActive: DataTypes.BOOLEAN,
    dateBuy: DataTypes.DATE,
    dateSell: DataTypes.DATE
  }, {});
  Holding.associate = function(models) {
    // associations can be defined here
  };
  return Holding;
};