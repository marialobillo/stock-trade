'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holding = sequelize.define('Holding', {
    userId: DataTypes.INTEGER,
    symbolId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {});
  Holding.associate = function(models) {
    // associations can be defined here
    Holding.hasMany(models.Transaction, {
      foreignKey: 'holdingId',
      as: 'transactions',
      onDelete: 'CASCADE',
    });

    Holding.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Holding.belongsTo(models.Symbol, {
      foreignKey: 'symbolId',
      as: 'symbol',
      onDelete: 'CASCADE',
    })
  };
  return Holding;
};