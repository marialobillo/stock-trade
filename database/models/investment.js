'use strict';
module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
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
  Investment.associate = function(models) {
    // associations can be defined here
    Investment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE'
    })
  };
  return Investment;
};