'use strict';

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Project.associate = function(models) {
    // A Project belongs to a user
    Project.belongsTo(models.User, { foreignKey: 'userId' });
    Project.hasMany(models.Thread, { foreignKey: 'projectId', as: 'threads' });
  };

  return Project;
};
