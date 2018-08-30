import { Thread } from './thread'

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    threadId: {
      type: DataTypes.INTEGER,
      references: {
        model: Thread,
        key: 'id'
      }
    },
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Thread, { foreignKey: 'threadId' });
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Post;
};
