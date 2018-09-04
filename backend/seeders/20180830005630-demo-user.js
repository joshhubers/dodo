'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //let genSalt = '';
    //let pword = '';
    //bcrypt.genSalt(10, function(err, salt) {
      //genSalt = salt;
      //console.log(genSalt);
      //bcrypt.hash('abc123', salt, function(err, hash) {
        //pword = hash;
      //});
    //});
    
    //const [pword, genSalt] = await new Promise((resolve) => {
      //bcrypt.genSalt(10, function(err, salt) {
        //bcrypt.hash('abc123', salt, function(err, hash) {
          //resolve([hash, salt]);
        //});
      //});
    //});

    const pword = await bcrypt.hashSync('abc123', 10);
    console.log(pword);
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.email.com',
      password: pword,
      createdAt: '1-1-2018',
      updatedAt: '1-1-2018',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
