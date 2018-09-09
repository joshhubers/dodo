'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const projects = await queryInterface.sequelize.query(
      `SELECT id from "Projects";`
    );

    const projectRows = projects[0];
    let threads = [];

    projectRows.forEach(pr => {
      var i;
      for(i = 0; i < 2; i++) {
        const t = {
          title: `Test Thread ${threads.length}`,
          projectId: pr.id,
          createdAt: '2018-1-1',
          updatedAt: '2018-1-1',
        };

        threads.push(t);
      }
    });


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
