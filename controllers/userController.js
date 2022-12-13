import db from '../database'
const { Op } = require("sequelize");

const userController = {
  all: async () => {
    const users = await db.User.findAll()
    const parsedUser = JSON.parse(JSON.stringify(users))
    return parsedUser
  },
  find: async (id) => {
    return await db.User.findByPk(id)
  },
  findByEmail: async data =>{
    const [user,created] = await db.User.findOrCreate({
      where:{email:data.email},
      defaults: {
        firstName: data.name,
        type: 'user',
        password: data.email
      }
    })
    return JSON.parse(JSON.stringify(user))
  },
  authorize: async credentials => {
    return await db.User.findOne({
      where: {
        [Op.and]: [
          { email: credentials.email },
          { password: credentials.password}
        ]
      }
    })
  },
  findCurrentQuiz: async id => {
    const category = await db.Category.findByPk(id);
    return JSON.parse(JSON.stringify(category))
  },
  updateCategoryDifficulty: async (user,category,difficulty)=>{
    await db.User_achievment.create({UserId:user,CategoryId:category,level:difficulty})
    await db.Setting.update({
      difficulty: difficulty
    },
    {
      where:{
        UserId: user,
        CategoryId: category
      }
    })
  },
  userAcheivements: async user_id=>{
    const data = await db.User_achievment.findAll(
      {
        where:{UserId:user_id},
        include:{model:db.Category}
      }
    )
    return JSON.parse(JSON.stringify(data))
  }
}

export default userController
