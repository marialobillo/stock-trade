'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};
