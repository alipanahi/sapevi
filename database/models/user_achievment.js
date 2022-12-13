'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initUser_achievments = (sequelize, DataTypes) => {
  class User_achievment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_achievment.belongsTo(models.User)
      User_achievment.belongsTo(models.Category)
    }
  }
  User_achievment.init({
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_achievment',
  });
  return User_achievment;
};

export default initUser_achievments(connection,DataTypes)