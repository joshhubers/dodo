'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pword = await bcrypt.hashSync('abc123', 10);


    const organizations = await queryInterface.sequelize.query(
      `SELECT id from "Organizations";`
    );

    const organizationRows = organizations[0];

    const users = [];

    var j = 0;
    organizationRows.forEach(or => {
      var i;
      for(i = 0; i < 3; i ++) {
        const user = {
          firstName: `User${users.length}`,
          lastName: 'LastName',
          email: `user${users.length}@doe.email.com`,
          password: pword,
          organizationId: or.id,
          createdAt: '1-1-2018',
          updatedAt: '1-1-2018',
        };

        users.push(user);
      }
    });

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
