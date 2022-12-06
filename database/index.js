import { imageConfigDefault } from 'next/dist/shared/lib/image-config.js';
import Sequelize from 'sequelize';
import config from './config/config.mjs';
import category from './models/category.js';
import question from './models/question.js';
import question_answer from './models/question_answer.js';
import setting from './models/setting.js';
import test from './models/test.js';
import test_question from './models/test_question.js';

import User from './models/user.js';

const db = {};
db.User = User
db.Setting = setting
db.Test = test
db.Test_question = test_question
db.Question = question
db.Question_answer = question_answer
db.Category = category

let sequelize;
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(config.production);
} else {
  sequelize = new Sequelize(config.development);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
