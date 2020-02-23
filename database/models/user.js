'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.DECIMAL
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Holding, {
      foreignKey: 'userId',
      as: 'holdings',
      onDelete: 'CASCADE',
    });
  };
  return User;
};