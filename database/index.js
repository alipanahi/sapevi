import { imageConfigDefault } from 'next/dist/shared/lib/image-config.js';
import Sequelize from 'sequelize';
import config from './config/config.mjs';

import User from './models/user.js';

const db = {};
db.User = User


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
