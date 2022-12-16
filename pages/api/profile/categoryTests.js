import questionController from "../../../controllers/questionController";

export default async function handler(req, res) {
  
  // get user data
  const { user, category } = JSON.parse(req.body)
  // insert categories to user setting
  const data = await questionController.userCategoryTests(user, category);
  //console.log('here is the data',data)
  res.status(200).send(data);
}
