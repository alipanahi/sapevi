import db from '../database'
const { Op } = require("sequelize");

const quizController = {
  
  saveQuestions: async data =>{
    let questionAnswers = []
    let allQuestions = []
    //loop through the data(all questions and their answers) from API for bulk insertion
    for (const item of data.data) {
        const dbQuestion = await db.Question.findOne({
            where:{
                question: item.question
            }
        })
        if(!dbQuestion){
            //get all the answers of a question
            questionAnswers[item.question] = [...new Set(item.incorrect_answers)]
            questionAnswers[item.question].push(item.correct_answer)
            allQuestions.push({
                question: item.question,
                CategoryId: data.category_id
            })
        }
    }
    //insert all the questions to DB
    const newArray = await db.Question.bulkCreate(allQuestions)
    let questionAnserArray = []
    //loop through inserted questions array
    const answers = newArray.map(item=>{
        
        const answerOptions = item.dataValues
        const eachQuestionAnswers = questionAnswers[answerOptions.question]//all answers of the question
        const eqchquestionAnserArray = eachQuestionAnswers.map((item,index)=>{
            let correct=false
            index===3 ? correct=true : correct=false
            return {
                answer: item,
                QuestionId: answerOptions.id,
                correct:correct
            }
        })
        questionAnserArray.push(...eqchquestionAnserArray)
    })
    await db.Question_answer.bulkCreate(questionAnserArray)
    
    //return JSON.parse(JSON.stringify(arrayToReturn));
  },
  saveUserAnswers: async data =>{
    //insert new record in tests table
    const test = await db.Test.create({
        UserId: data.user_id,
        CategoryId: data.category_id,
        score: data.score,
        number_questions: data.number,
        test_date: new Date()
    })
    const testId = test.dataValues.id
    //then insert the question to test_questions table with user answers
    //console.log('test id',testId)
    const userAnswerQuestions = []
    //loop through the data(all questions and their answers) from API for bulk insertion
    for (const item of data.data) {
        //get all the answers of a question
        const questionId = await db.Question.findOne({
            where:{
                question: item.question
            }
        })
        const userAnswer = item.answers.find(toCheck=>toCheck.selected)
            userAnswerQuestions.push({
                TestId: testId,
                QuestionId: questionId.id,
                user_answer:userAnswer.name,
                correct:userAnswer.isCorrect
            })
    }
    //console.log('to be saved',userAnswerQuestions)
    await db.Test_question.bulkCreate(userAnswerQuestions)
    
  },
  categoryDetails: async category_id=>{
    const category = await db.Setting.findOne({
        
        include:{
            model: db.Category,
            where:{
                id:category_id
            }
        }
    })
    return JSON.parse(JSON.stringify(category));
  },
  userTests: async user_id =>{
    const data = await db.Test.findAndCountAll({
        where:{
            UserId: user_id
        },
        include:{
            model:db.Category
        }
    })
    return JSON.parse(JSON.stringify(data));
  }
  
}

export default quizController
