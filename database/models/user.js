'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initUser = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // define association here
      User.hasMany(models.Setting)
      User.hasMany(models.Test)

      
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    profile_picture: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
export default initUser(connection,DataTypes)