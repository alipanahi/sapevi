'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initSetting = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Setting.belongsTo(models.User)
      Setting.belongsTo(models.Category)
    }
  }
  Setting.init({
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    difficulty: DataTypes.STRING,
    number_questions: DataTypes.INTEGER,
    repeat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};

export default initSetting(connection,DataTypes)