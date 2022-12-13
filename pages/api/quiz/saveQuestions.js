import quizController from "../../../controllers/quizController";

export default function handler(req, res) {
    const data = JSON.parse(req.body);
    //console.log('herer',data)
    if(data.data.length>0)
    {
        const result = quizController.saveQuestions(data)
        //console.log('resutls',result)
         // Then save the post data to a database
        res.status(200).json({ message: result});
    }
     res.status(400).json({ message: "not saved" });
   
  }