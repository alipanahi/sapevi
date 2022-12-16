import db from '../database'
const { Op } = require("sequelize");
import connection from '../database/connection'

const questionController = {
  categories: async () => {
    const categories = await db.Category.findAll()
    const parsedCategories = JSON.parse(JSON.stringify(categories))
    return parsedCategories
    },
    insertSetting: async (data) => {
        db.Setting.destroy({
            where:{
                UserId:data.userId
            }
        })
        const user = await db.User.update({ firstName: data.firstName, lastName: data.lastName }, { where: { id: data.userId } })
        if (data.category.length > 1) {
            const categories = data.category.map(async id => await db.Setting.create({UserId: data.userId, CategoryId: id, difficulty: 'easy', number_questions: 5, repeat: 1}))
        } else {
            const categories = await db.Setting.create({UserId: data.userId, CategoryId: data.category, difficulty: 'easy', number_questions: 5, repeat: 1 })
        }
    },
    quizList: async (data) => {
        const settings = await db.Setting.findAll({ include: [{ model: db.User, where: { email: data.email } }, {model: db.Category}] })
        return JSON.parse(JSON.stringify(settings));
    },
    userCategories: async user_id=>{
        const categories = await db.Category.findAll({
            
            include:{
                model:db.Setting,
                where:{
                    UserId: user_id
                },
                required: false
            }
        })
        return JSON.parse(JSON.stringify(categories));
    },
    userCategoryTests: async (user,category)=>{
        const tests = await db.Test.findAll({
            where:{
                UserId: user,
                CategoryId: parseInt(category)
            },
            include:{
                model:db.Category
            }
        })
        return JSON.parse(JSON.stringify(tests));
    },
    topUsers: async ()=>{
        const data = await db.Test.findAll({ 
            attributes: [
                
                [connection.fn('SUM', connection.col('score')), 'total'],
                'UserId',
                [connection.fn("concat",connection.col('firstName')," ",connection.col('lastName')), 'full_name']
            ],
            offset:0,
            limit:3,
            include:{
                model:db.User,
                attributes:[]
            },
            order:[
                [connection.fn('SUM', connection.col('score')), 'DESC']
            ],
            group: ['UserId',[connection.fn("concat",connection.col('firstName')," ",connection.col('lastName')), 'full_name']]
        })
        return JSON.parse(JSON.stringify(data))
    }
}

export default questionController
