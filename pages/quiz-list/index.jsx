import React, { Component } from "react";
import MainHeader from "../../components/MainHeader";
import { getSession } from "next-auth/react";
import QuizCardView from "../../components/QuizCardView";
import questionController from "../../controllers/questionController";
import userController from "../../controllers/userController";
import { motion } from "framer-motion";

const Home = ({ questions, currentUser }) => {
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: -1 }}
      className="main-bg-color"
    >
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <div className="row">
            {questions.map((question) => (
              <QuizCardView
                key={question.id}
                id={question.Category.id}
                img={question.Category.imgUrl}
                title={question.Category.title}
                desc={question.Category.description}
                questions={question.Category.number_of_question}
                time="5"
                level={question.difficulty}
                btn={true}
              />
            ))}
          </div>
        </main>
      </div>
    </motion.div>
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
