'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initCategory = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Test)
      Category.hasMany(models.Setting)
      Category.hasMany(models.Question)
    }
  }
  Category.init({
    title: DataTypes.STRING,
    code: DataTypes.INTEGER,
    api_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
export default initCategory(connection,DataTypes)