import React,{memo} from "react"
import Answer from "./Answer"
import styles from '../styles/quiz.module.css'
export default memo(function List(props){
    
    let {question,list} = props
    
    return (
        <div className={styles.card}>
            <div className={styles.card_body}>
                <div className="d-flex flex-row align-content-center align-items-center mb-5">
                    <div className="sw-5 me-4">
                        <div className="border border-1 border-primary rounded-xl sw-5 sh-5 text-primary d-flex justify-content-center align-items-center">{1}</div>
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
