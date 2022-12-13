import React,{memo,useContext} from "react"
import UserContext from "./userContext"
import styles from '../styles/quiz.module.css'

export default memo(function Answer({options,question}){
    const dataConsumer = useContext(UserContext)
    //const {handleSelect} = useContext(UserContext)
    const answer = options.map(item=>{
        return (
            <div key={options.indexOf(item)} className="d-flex flex-row align-content-center align-items-center position-relative mb-3">
                <div className="sw-5 me-4 d-flex justify-content-center flex-grow-0 flex-shrink-0">
                    <div className="d-flex justify-content-center align-items-center">
                        {options.indexOf(item)+1}
                    </div>
                </div>
                <div className={styles.text_alternate}>
                    <span className={!item.isChecked ? styles.answer : styles.answer_disabled}
                    style={{background:item.correctStyle}}
                    onClick={!item.isChecked ? ()=>dataConsumer.handleSelect(item.key,question) : null}>{atob(item.name)}</span>
                </div>
            </div>
            )
    })
    return (
        <>
        {answer}
        </>
        )
})
