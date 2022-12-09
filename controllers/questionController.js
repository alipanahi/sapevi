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
            const categories = data.category.map(async d => await db.Setting.create({UserId: data.userId,CategoryId: d }))
        } else {
            const categories = await db.Setting.create({UserId: data.userId,CategoryId: data.category })
        }
    }
}

export default questionController
