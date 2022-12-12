import React, { Component } from "react";
import MainHeader from "../../components/MainHeader";
import BreadCrumb from "../../components/BreadCrumb";
import { getSession } from "next-auth/react";
import QuizCardView from "../../components/QuizCardView";
import questionController from "../../controllers/questionController";
import userController from "../../controllers/userController";

const Home = ({ questions, currentUser }) => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />
            {questions.map((question) => (
              <QuizCardView
                key={question.id}
                id={question.Category.id}
                img={question.Category.imgUrl}
                title={question.Category.title}
                desc={question.Category.description}
                questions={question.Category.number_of_question}
                time="5"
                level="Beginer"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  if (session) {
    let questions = await questionController.quizList(session.user);
    let currentUser = await userController.findByEmail(session.user);
    return {
      props: {
        questions,
        currentUser,
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
