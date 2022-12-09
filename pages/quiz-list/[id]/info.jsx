import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import { getSession } from "next-auth/react";
import userController from "../../../controllers/userController";
import Link from "next/link";

const infoPage = ({ questions, currentUser }) => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />

            <Link href={`/quiz-list/new`}>
              <button className="btn btn-primary">Let`s go to the test</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default infoPage;
export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  if (session) {
    let currentUser = await userController.findByEmail(session.user);
    return {
      props: {
        currentUser,
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
