'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initTest_question = (sequelize, DataTypes) => {
  class Test_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test_question.belongsTo(models.Test)
      Test_question.belongsTo(models.Question)
    }
  }
  Test_question.init({
    TestId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER,
    user_answer: DataTypes.INTEGER,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Test_question',
  });
  return Test_question;
};
export default initTest_question(connection,DataTypes)