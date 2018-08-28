import { Project } from './project'
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    title: DataTypes.STRING,
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      }
    }
  });
  Thread.associate = function(models) {
    // associations can be defined here
    Thread.belongsTo(models.Project, { foreignKey: 'project_id' })
  };
  return Thread;
};
