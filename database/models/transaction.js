'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    holdingId: DataTypes.INTEGER,
    typeTransaction: DataTypes.STRING,
    shares: DataTypes.INTEGER,
    stockPrice: DataTypes.DECIMAL
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};