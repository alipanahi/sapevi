import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import { getSession } from "next-auth/react";
import userController from "../../../controllers/userController";
import quizController from "../../../controllers/quizController"
import Link from "next/link";
import QuizCardView from "../../../components/QuizCardView";

const infoPage = ({ currentUser, categroy_id, currentQuiz }) => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />
            <Link href={`/quiz-list/${categroy_id}/new`}>
              <button className="btn btn-primary">Start the test</button>
            </Link>
            <QuizCardView
              key={currentQuiz.Category.id}
              img={currentQuiz.Category.imgUrl}
              title={currentQuiz.Category.title}
              desc={currentQuiz.Category.description}
              questions={currentQuiz.Category.number_of_question}
              time="5"
              level={currentQuiz.difficulty}
              btn={false}
            />
            <div className="col">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body">
                  <h5 className="card-title fs-2">Test Rules</h5>
                  <hr />
                  <h6 className="card-subtitle mb-2 text-muted">
                    Please read carfully
                  </h6>
                  <p className="card-text">
                    <span className="fs-2">1</span> &nbsp; After the test is started, by leaving the test page by any reason, your score will be calculated base on answers.
                  </p>
                  <p className="card-text">
                    <span className="fs-2">2</span> &nbsp; There is no time limit for the test.
                  </p>
                  <p className="card-text">
                    <span className="fs-2">3</span> &nbsp; by default the difficulty of test is EASY.
                  </p>
                  <p className="card-text">
                    <span className="fs-2">4</span> &nbsp; if more than 5 test of same category is passed with an average of 80%, then the difficulty will be promoted to next level.
                  </p>
                  <p className="card-text">
                    <span className="fs-2">5</span> &nbsp; You have the chance to see the correct answers of all questions after you complete the test.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default infoPage;
export async function getServerSideProps(req, res) {
  const categroy_id = req.query.id;
  const session = await getSession(req);
  if (session) {
    let currentUser = await userController.findByEmail(session.user);
    let currentQuiz = await quizController.categoryDetails(categroy_id);

    //calcuate the level of user in this category to find the difficulty
    const userTests = await quizController.userCategoryTests(currentUser.id,categroy_id,currentQuiz.difficulty);
    if(userTests){
      const average = userTests.rows.map(item=>{
        //percentage of every test
        return {
          avg: (item.score * 100) / item.number_questions,
        }
      });
      let totalPer = 0;
      for (const [index, avg] of Object.entries(average)) {
        //average of every category
        totalPer += avg.avg;
      }
      //const per = average.reduce((a,b)=>a+b)
      const categoryPercentage = totalPer / average.length;
      if(categoryPercentage>=80 && userTests.count>=5 && currentQuiz.difficulty!='hard'){//give user badge
        let level = currentQuiz.difficulty
        if(currentQuiz.difficulty==='easy') level = 'medium'
        if(currentQuiz.difficulty==='medium') level = 'hard'
        await userController.updateCategoryDifficulty(currentUser.id,categroy_id,level)
      }
    }
    //end of calculation
    return {
      props: {
        currentUser,
        categroy_id,
        currentQuiz,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
}
