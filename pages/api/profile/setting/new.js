import questionController from "../../../../controllers/questionController";

export default async function handler(req, res) {
  // get just categories
  const { category } = req.body
  
  // get user data
  const { userId, firstName, lastName, email, password } = req.body

  // insert categories to user setting
  const setting = await questionController.insertSetting({ userId, firstName, lastName, category });
  res.status(200).redirect(`/quiz-list`);
}
