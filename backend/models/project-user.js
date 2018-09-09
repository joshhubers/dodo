'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, { updatedAt: false, });
  ProjectUser.associate = function(models) {
    // associations can be defined here
    ProjectUser.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    ProjectUser.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return ProjectUser;
};
