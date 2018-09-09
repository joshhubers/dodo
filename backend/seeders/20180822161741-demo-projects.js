'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    );

    const userRows = users[0];

    let projects = [];

    userRows.forEach(ur => {
      var i;
      for(i = 0; i < 3; i++) {
        const p = {
          userId: ur.id,
          title: `Test Project ${projects.length}`,
          description: `This is the description of project ${projects.length}`,
          status: 'active',
          createdAt: '2018-1-1',
          updatedAt: '2018-1-1',
        };

        projects.push(p);
      }
    });
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
