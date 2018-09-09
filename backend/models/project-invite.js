'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectInvite = sequelize.define('ProjectInvite', {
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, { updatedAt: false });
  ProjectInvite.associate = function(models) {
    // associations can be defined here
    ProjectInvite.belongsTo(models.User, { foreignKey: 'fromUserId', as: 'from' });
    ProjectInvite.belongsTo(models.User, { foreignKey: 'toUserId', as: 'to' });
    ProjectInvite.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
  };
  return ProjectInvite;
};
