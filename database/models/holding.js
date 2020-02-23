'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holding = sequelize.define('Holding', {
    userId: DataTypes.INTEGER,
    symbolId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {});
  Holding.associate = function(models) {
    // associations can be defined here
  };
  return Holding;
};