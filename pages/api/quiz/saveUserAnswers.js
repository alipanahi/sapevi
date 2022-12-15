import quizController from "../../../controllers/quizController";

export default function handler(req, res) {
    const data = JSON.parse(req.body);
    if(data.data.length>0) {
        quizController.saveUserAnswers(data)
        // Then save the post data to a database
        res.status(200).json({ message: "saved" });
    } else {
        res.status(400).json({ message: "not saved" });
    }
  }