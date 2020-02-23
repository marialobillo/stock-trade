'use strict';
module.exports = (sequelize, DataTypes) => {
  const Symbol = sequelize.define('Symbol', {
    companyName: DataTypes.STRING,
    symbol: DataTypes.STRING
  }, {});
  Symbol.associate = function(models) {
    // associations can be defined here
    Symbol.hasMany(models.Holding, {
      foreignKey: 'symbolId',
      as: 'holdings',
      onDelete: 'CASCADE',
    })
  };
  return Symbol;
};