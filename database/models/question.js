'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initQuestion = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.hasMany(models.Question_answer)
      Question.hasMany(models.Test_question)
      Question.belongsTo(models.Category)
    }
  }
  Question.init({
    question: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};

export default initQuestion(connection,DataTypes)