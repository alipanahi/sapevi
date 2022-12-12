import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import { getSession } from "next-auth/react";
import userController from "../../../controllers/userController";
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
              <button className="btn btn-primary">Let`s go to the test</button>
            </Link>
            <QuizCardView
              key={currentQuiz.id}
              img={currentQuiz.imgUrl}
              title={currentQuiz.title}
              desc={currentQuiz.description}
              questions={currentQuiz.number_of_question}
              time="5"
              level="Beginer"
            />
            <div className="col">
              <div class="card border-0 shadow-sm mt-3">
                <div class="card-body">
                  <h5 class="card-title fs-2">Test Rules</h5>
                  <hr />
                  <h6 class="card-subtitle mb-2 text-muted">
                    Please read carfully
                  </h6>
                  <p class="card-text">
                    <span className="fs-2">1</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
                  </p>
                  <p class="card-text">
                    <span className="fs-2">2</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
                  </p>
                  <p class="card-text">
                    <span className="fs-2">3</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
                  </p>
                  <p class="card-text">
                    <span className="fs-2">4</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
                  </p>
                  <p class="card-text">
                    <span className="fs-2">5</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
                  </p>
                  <p class="card-text">
                    <span className="fs-2">6</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
                  </p>
                  <p class="card-text">
                    <span className="fs-2">7</span> &nbsp; Lorem ipsum dolor sit
                    amet consectetur adipisicing elit.
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
    let currentQuiz = await userController.findCurrentQuiz(categroy_id);
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
        destination: `/home`,
      },
    };
  }
}
