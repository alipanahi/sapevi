import React, { Component } from "react";
import MainHeader from "../../components/MainHeader";
import { getSession } from "next-auth/react";
import QuizCardView from "../../components/QuizCardView";
import questionController from "../../controllers/questionController";
import userController from "../../controllers/userController";
import Link from "next/link";
import Script from "next/script";

const Home = ({ questions, currentUser }) => {
  return (
    <div className="main-bg-color">
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></Script>
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          {questions.length > 0 ? (
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
          ) : (
            <div style={{ textAlign: "center" }}>
              <br />
              <span>
                You do not have any category in your list, please go to settings
                to select categories
              </span>
              <br />
              <Link href="/profile/setting" className="btn btn-primary">
                Go to Settings
              </Link>
            </div>
          )}
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
