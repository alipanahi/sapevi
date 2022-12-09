import React,{memo} from "react"
import Answer from "./Answer"
import styles from '../styles/quiz.module.css'
export default memo(function Question(props){
    
    let {question,list,number} = props
    
    return (
        <div className={styles.card}>
            <div className={styles.card_body}>
                <div className="d-flex flex-row align-content-center align-items-center mb-5">
                    <div className="sw-5 me-4">
                        <div className={styles.questionNo}>{number+1}</div>
                    </div>
                    <div className="heading mb-0">
                        {atob(question)}
                    </div>
                </div>
                
                <Answer options={list} question={question}/>
                    
            </div>
        </div>
    )
})
