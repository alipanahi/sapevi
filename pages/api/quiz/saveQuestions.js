import quizController from "../../../controllers/quizController";

export default function handler(req, res) {
    const data = JSON.parse(req.body);
    console.log('herer',data)
    if(data.data.length>0)
    {
        quizController.saveQuestions(data)
    }
    // Then save the post data to a database
    res.status(200).json({ message: "saved" });
  }