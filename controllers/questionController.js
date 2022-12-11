import db from '../database'
const { Op } = require("sequelize");

const questionController = {
  categories: async () => {
    const categories = await db.Category.findAll()
    const parsedCategories = JSON.parse(JSON.stringify(categories))
    return parsedCategories
    },
    insertSetting: async (data) => {
        const user = await db.User.update({ firstName: data.firstName, lastName: data.lastName }, { where: { id: data.userId } })
        if (data.category.length > 1) {
            const categories = data.category.map(async d => await db.Setting.create({UserId: data.userId, CategoryId: d, difficulty: 'easy', number_questions: 5, repeat: 1}))
        } else {
            const categories = await db.Setting.create({UserId: data.userId, CategoryId: data.category, difficulty: 'easy', number_questions: 5, repeat: 1 })
        }
    },
    quizList: async (data) => {
        const settings = await db.Setting.findAll({ include: [{ model: db.User, where: { email: data.email } }, {model: db.Category}] })
        return JSON.parse(JSON.stringify(settings));
    },
}

export default questionController
