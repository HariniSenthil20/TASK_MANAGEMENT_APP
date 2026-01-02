const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');

// Define associations
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Task.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = {
  sequelize,
  User,
  Task,
};

