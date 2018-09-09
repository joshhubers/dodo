'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
    Organization.hasMany(models.User, { foreignKey: 'organizationId', as: 'users' });
  };
  return Organization;
};
