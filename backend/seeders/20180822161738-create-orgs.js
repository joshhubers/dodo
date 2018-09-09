'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Organizations', [
      {
        name: 'Demo Org 0',
        createdAt: '2018-1-1',
        updatedAt: '2018-1-1',
      },
      {
        name: 'Demo Org 1',
        createdAt: '2018-1-1',
        updatedAt: '2018-1-1',
      },
      {
        name: 'Demo Org 2',
        createdAt: '2018-1-1',
        updatedAt: '2018-1-1',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organizations', null, {});
  }
};
