'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    });
    User.associate = function(models) {
        // A user can have many post
      User.hasMany(models.Project, { foreignKey: 'userId', as: 'ownedProjects' });
      User.hasMany(models.Post, { foreignKey: 'userId' });
      User.belongsTo(models.Organization, { foreignKey: 'organizationId', as: 'organization' });
      //See belongs-to-many for projects http://docs.sequelizejs.com/manual/tutorial/associations.html
      User.belongsToMany(models.Project, { through: 'ProjectUser', foreignKey: 'userId', as: 'memberProjects' });
    };
    return User;
};
