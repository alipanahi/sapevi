import React,{memo} from "react"
import Answer from "./Answer"
export default memo(function Question(props){
    
    let {question,list,number} = props
    
    return (
        <div className="card border-0 shadow-sm p-3 my-3">
                <div className="d-flex align-items-center mb-3">
                    <span className="fs-1">{number+1}</span> &nbsp;
                        {atob(question)}
                </div>
                
                <Answer options={list} question={question}/>
        </div>
    )
})
