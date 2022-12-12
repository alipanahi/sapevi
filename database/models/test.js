'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initTest = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test.hasMany(models.Test_question)
      Test.belongsTo(models.User)
      Test.belongsTo(models.Category)
    }
  }
  Test.init({
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    test_date: DataTypes.DATE,
    score: DataTypes.INTEGER,
    number_questions: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Test',
  });
  return Test;
};

export default initTest(connection,DataTypes)