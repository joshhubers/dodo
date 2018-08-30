import { Project } from './project'
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    title: DataTypes.STRING,
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      }
    }
  });
  Thread.associate = function(models) {
    // associations can be defined here
    Thread.belongsTo(models.Project, { foreignKey: 'projectId' });
    Thread.hasMany(models.Post, { foreignKey: 'threadId', as: 'posts' });
  };
  return Thread;
};
