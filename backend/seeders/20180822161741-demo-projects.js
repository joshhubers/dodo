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

    let projects = [];
    var i;
    for(i = 0; i < 7; i++) {
      const p = {
        userId: 1,
        title: `Test Project ${i}`,
        description: `This is the description of project ${i}`,
        status: 'active',
        createdAt: '2018-1-1',
        updatedAt: '2018-1-1',
      };

      projects.push(p);
    }

    return queryInterface.bulkInsert('Projects', projects, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
