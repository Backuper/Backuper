const { Sequelize, Model, DataTypes } = require('sequelize');
class User extends Model {}
User.init({
  id: DataTypes.STRING,
  backupid: DataTypes.STRING
}, { sequelize, modelName: 'user' });
moduel.exports = User