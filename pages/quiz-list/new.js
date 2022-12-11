import React, { useState } from "react"
import UserContext from '../userContext';
import Question from "../../components/Question";
import { getSession, useSession } from "next-auth/react";
import userController from "../../controllers/userController";
import styles from "../../styles/quiz.module.css"
import MainHeader from "../../components/MainHeader";
import BreadCrumb from "../../components/BreadCrumb";


export default function Questions(props){
    const {currentUser,category,difficulty,number,category_id} = props

    const [dbData, setDbData] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [questionElement, setQuestionElement] = React.useState([])
    const [isChecked,setIsChecked] = React.useState({
        checked : false,
        score : 0
    })
    const [userAnswers,setUserAnswers] = useState([])
    React.useEffect(function(){
        let controller = new AbortController()
        fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`,{signal: controller.signal})
            .then(res => res.json())
            .then(data=>{
                const postData = {data:data.results,category_id:category_id}
                fetch("/api/quiz/saveQuestions",{
                    method: "POST",
                    body: JSON.stringify(postData),
                })//.then(response=>response.json()).then(inserted=>console.log('whit idsss',inserted))
                setDbData(data.results)
            })
        return function(){
            controller.abort()
        }
    },[])
    React.useEffect(function(){
        
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
    React.useEffect(function(){
        const questionElement = dbData.map(item => {
            return (<Question key={item.question} list={answers[item.question]} {...item} number={dbData.indexOf(item)} />)
        })
        setQuestionElement(questionElement)
        //cleanup
        return () =>{
            setQuestionElement([])
        }
    },[answers])
    React.useEffect(function(){
        //save users answers
        console.log('berefore send',userAnswers)
        const postData = {data:userAnswers,score:isChecked.score,category_id:category_id,user_id:currentUser.id}
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
                    {...item,correctStyle:"#94D7A2","isChecked":true}
                : item.selected ? {...item,correctStyle:"#F8BCBC","isChecked":true} : {...item,"isChecked":true}
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
        
    }
    
    function handleSelect(id,name){
        const answersElement = []
        for (const [key,answer] of Object.entries(answers)) {
            
            if(key === name){//apply class of selected for current question only
                const answersList =[]
                for (const [no, item] of Object.entries(answer)) {
                    answersList[no] = 
                    item.key === id ? {...item,selected:true,correctStyle:"#9e62c7"} : {...item,selected:false,correctStyle:""}
                    
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
        
        <div className={styles.main}>
            <div className="container">
                <MainHeader currentUser={currentUser}/>
                <h1 className={styles.title}>Advanced React Web Developer Course</h1>
                <BreadCrumb />
                <div className="row g-5">
                    <div className="col-lg-4 col-xxl-3">
                        <h2 className={styles.small_title}>Quiz Info</h2>
                        <div className="card mb-5">
                            
                            <img src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3Rqc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" class="card-img-top sh-25" alt="card image" />
                            <div className="card-body">
                            <div className="mb-3 text-muted">
                                Pie fruitcake jelly beans. Candy tootsie chocolate croissant jujubes icing chocolate croissant jujubes icing macaroon croissant.
                            </div>
                            <div className="row g-0 align-items-center mb-1">
                                <div className="col-auto">
                                <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="form-check" class="text-primary"></i>
                                </div>
                                </div>
                                <div className="col ps-3">
                                <div className="row g-0">
                                    <div class="col">
                                    <div class="text-alternate sh-4 d-flex align-items-center lh-1-25">Questions</div>
                                    </div>
                                    <div class="col-auto">
                                    <div class="sh-4 d-flex align-items-center text-alternate">25</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="row g-0 align-items-center mb-1">
                                <div class="col-auto">
                                <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="clock" class="text-primary"></i>
                                </div>
                                </div>
                                <div class="col ps-3">
                                <div class="row g-0">
                                    <div class="col">
                                    <div class="text-alternate sh-4 d-flex align-items-center lh-1-25">Time</div>
                                    </div>
                                    <div class="col-auto">
                                    <div class="sh-4 d-flex align-items-center text-alternate">5m</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="row g-0 align-items-center">
                                <div class="col-auto">
                                <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="graduation" class="text-primary"></i>
                                </div>
                                </div>
                                <div class="col ps-3">
                                <div class="row g-0">
                                    <div class="col">
                                    <div class="text-alternate sh-4 d-flex align-items-center lh-1-25">Level</div>
                                    </div>
                                    <div class="col-auto">
                                    <div class="sh-4 d-flex align-items-center text-alternate">Beginner</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-xxl-9">
                        <h2 className={styles.small_title}>Questions</h2>
                        <UserContext.Provider value={{handleSelect:handleSelect}}>
                            {questionElement}
                        </UserContext.Provider>
                        <div className="row">
                            <div className={`col-12 text-center ${styles.result_div}`}>
                            <button onClick={checkAnswers} class="btn btn-outline-primary btn-icon btn-icon-end sw-25">
                                <span>Check Answers</span>
                                <i data-acorn-icon="check"></i>
                            </button>
                            {isChecked.checked && <p className={styles.score}>You scored {isChecked.score}/{number} correct answers</p>}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export async function getServerSideProps(req, res) {
    //const category = req.body.category
    //const difficulty = req.body.difficulty
    //const number = req.body.difficulty

    const session = await getSession(req)
    if(session){
      let currentUser = await userController.findByEmail(session.user)
      return {
        props: {currentUser,category:9,difficulty:'easy',number:5,category_id:1}
      }
      
    }else{
      return {
          redirect: {
          permanent: false,
          destination: `/home`
          }
      }
    }
    
  }