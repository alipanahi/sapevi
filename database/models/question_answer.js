'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initQuestion_answer = (sequelize, DataTypes) => {
  class Question_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question_answer.belongsTo(models.Question)
    }
  }
  Question_answer.init({
    answer: DataTypes.STRING,
    QuestionId: DataTypes.INTEGER,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Question_answer',
  });
  return Question_answer;
};
export default initQuestion_answer(connection,DataTypes)