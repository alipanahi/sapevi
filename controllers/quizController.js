import db from '../database'
const { Op } = require("sequelize");

const quizController = {
  
  saveQuestions: async data =>{
    let questionAnswers = []
    const array = data.data.map(item=>{
        questionAnswers[item.question] = [...new Set(item.incorrect_answers)]
        questionAnswers[item.question].push(item.correct_answer)
        return {
            question: item.question,
            CategoryId: data.category_id
        }
    })
    const newArray = await db.Question.bulkCreate(array)
    let questionAnserArray = []
    const answers = newArray.map(item=>{
        const answerOptions = item.dataValues
        const eachQuestionAnswers = questionAnswers[answerOptions.question]
        const eqchquestionAnserArray = eachQuestionAnswers.map(item=>{
            return {
                answer: item,
                QuestionId: answerOptions.id,
                correct:false
            }
        })
        questionAnserArray.push(...eqchquestionAnserArray)
    })
    await db.Question_answer.bulkCreate(questionAnserArray)
  },
  
}

export default quizController
