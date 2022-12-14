import UserContext from '../../../components/userContext';
import Question from "../../../components/Question";
import { getSession, useSession } from "next-auth/react";
import userController from "../../../controllers/userController";
import styles from "../../../styles/quiz.module.css"
import MainHeader from "../../../components/MainHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import Link from "next/link";
import quizController from "../../../controllers/quizController";
import { useState, useEffect } from "react";
import QuizCardView from "../../../components/QuizCardView";
import Router from "next/router";

export default function Questions({currentUser,categoryDetails}){
    
    const category = categoryDetails.Category.code
    const difficulty=categoryDetails.difficulty
    const number=categoryDetails.number_questions
    const category_id=categoryDetails.CategoryId

    const [dbData, setDbData] = useState([])//main data from api
    const [answers, setAnswers] = useState([])//the answers
    const [questionElement, setQuestionElement] = useState([])//question element includeing questin itself and options
    const [isChecked,setIsChecked] = useState({
        checked : false,
        score : 0
    })
    const [loading,setLoading] = useState(false)
    const [userAnswers,setUserAnswers] = useState([])//user answers to be saved in db

    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
          window.history.pushState(null, document.title, window.location.href);
        });
        
        window.onbeforeunload = ()=>{
            console.log('leaving')
            return ""
        }
    })
    
   
    
    //Router.push("/quiz-list");
    useEffect(function(){
        setLoading(true)
        let controller = new AbortController()
        fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`,{signal: controller.signal})
            .then(res => res.json())
            .then(data=>{
                //save the questions to db
                const postData = {data:data.results,category_id:category_id}
                fetch("/api/quiz/saveQuestions",{
                    method: "POST",
                    body: JSON.stringify(postData),
                })
                setDbData(data.results)
                setLoading(false)
            })
        return function(){
            controller.abort()
        }
    },[])
    useEffect(function(){
        
        const answersElement = []
        for(let i=0;i<dbData.length;i++){
            let item = dbData[i]
            //make one array of asnwers from incorrect answers and correct answer
            let answersOptions = [...new Set(item.incorrect_answers)]
            answersOptions.push(item.correct_answer)
            //sort answers array randomly
            let list = answersOptions.sort(() => Math.random() - 0.5)
            const answersList =[]
            for(let i=0;i<4;i++){//add attributes to answers
                let isCorrect = list[i] === item.correct_answer ? true : false
                answersList[i]={"key":i,"name":list[i],"selected":false,"correctStyle":"","isCorrect":isCorrect,"isChecked":false}
            }
            answersElement[item.question] = answersList
        }
        setAnswers(answersElement)
        //cleanup
        return () =>{
            setAnswers([])
        }
        
    },[dbData])
    useEffect(function(){
        const questionElement = dbData.map(item => {
            return (<Question key={item.question} list={answers[item.question]} {...item} number={dbData.indexOf(item)} />)
        })
        setQuestionElement(questionElement)
        //cleanup
        return () =>{
            setQuestionElement([])
        }
    },[answers])
    useEffect(function(){
        //save users answers
        const postData = {data:userAnswers,score:isChecked.score,category_id:category_id,user_id:currentUser.id,number:number,difficulty:difficulty}
        fetch("/api/quiz/saveUserAnswers",{
            method: "POST",
            body: JSON.stringify(postData),
        })
    },[isChecked])
    function checkAnswers(){
        const answersElement = []
        let userAnswersArray = []
        let totalScore = 0
        //loop through questions object
        for (const [key,answer] of Object.entries(answers)) {

            const answersList =[]
            //loop through every question answers object
            for (const [no, item] of Object.entries(answer)) {
                //add score if the correct answer is selected
                totalScore += item.isCorrect && item.selected ? 1 : 0 
                //apply design for correct and incorrect answers
                answersList[no] = 
                item.isCorrect ? 
                    {...item,correctStyle:"#198754","isChecked":true}
                : item.selected ? {...item,correctStyle:"#dc3545","isChecked":true} : {...item,"isChecked":true}
            }
            userAnswersArray.push({question:key,answers:answersList})
            answersElement[key] = answersList
        }
        setUserAnswers(userAnswersArray)
        setAnswers(answersElement)
        setIsChecked({
            checked : true,
            score : totalScore
        })
        window.scrollTo(0, 50);
    }
    
    function handleSelect(id,name){
        const answersElement = []
        for (const [key,answer] of Object.entries(answers)) {
            
            if(key === name){//apply class of selected for current question only
                const answersList =[]
                for (const [no, item] of Object.entries(answer)) {
                    answersList[no] = 
                    item.key === id ? {...item,selected:true,correctStyle:"#ced4da"} : {...item,selected:false,correctStyle:""}
                    
                }
                answersElement[key] = answersList
            }
            else{//the other question remains the same
                answersElement[key] = answer
            }
            
        }
        setAnswers(answersElement)
        
    }
    return (
        
        <div className="main-bg-color">
            <div className="container py-3">
                
                <div className="row">
                    <h3>Test info</h3>
                        <QuizCardView
                            key={categoryDetails.id}
                            img={categoryDetails.Category.imgUrl}
                            title={categoryDetails.Category.title}
                            desc={categoryDetails.Category.description}
                            questions={categoryDetails.Category.number_of_question}
                            time="5"
                            level={categoryDetails.difficulty}
                        />
                    
                    <div className="col">
                        {isChecked.checked && <div className="alert alert-primary" role="alert">You scored {isChecked.score}/{number} correct answers</div>}
                        <h2>Questions</h2>
                        <UserContext.Provider value={{handleSelect:handleSelect}}>
                            {loading ? 'Loading... please wait' : questionElement}
                        </UserContext.Provider>
                        
                        <div className="row">
                            {isChecked.checked ? <Link href={`/quiz-list/${category_id}/info`} className='btn btn-primary my-2'>Go to Back</Link> :
                            <button onClick={checkAnswers} className="btn btn-outline-primary btn-icon btn-icon-end sw-25">
                                <span>Check Answers</span>
                            </button>}
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export async function getServerSideProps(req, res) {
    const category_id = req.query.id
    //const difficulty = req.body.difficulty
    //const number = req.body.difficulty

    const session = await getSession(req)
    if(session){
        const categoryDetails = await quizController.categoryDetails(category_id)
        //console.log(categoryDetails)
      let currentUser = await userController.findByEmail(session.user)
      return {
        props: {currentUser,categoryDetails}
      }
      
    }else{
      return {
          redirect: {
          permanent: false,
          destination: `/`
          }
      }
    }
    
  }