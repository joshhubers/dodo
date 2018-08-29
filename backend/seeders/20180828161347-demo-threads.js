'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let threads = [];
    var i;
    for(i = 0; i < 7*3; i++) {
      const t = {
        title: `Test Thread ${i}`,
        projectId: (i % 6) + 1,
        createdAt: '2018-1-1',
        updatedAt: '2018-1-1',
      };

      threads.push(t);
    }

    return queryInterface.bulkInsert('Threads', threads, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('Threads', null, {});
  }
};
