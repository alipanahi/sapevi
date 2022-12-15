import React from "react";
import { getSession } from "next-auth/react";
import MainHeader from "../../components/MainHeader";
import "bootstrap/dist/css/bootstrap.css";
import BreadCrumb from "../../components/BreadCrumb";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import QuizCardView from "../../components/QuizCardView";
import userController from "../../controllers/userController";
import questionController from "../../controllers/questionController";
import { motion } from "framer-motion";

const SettingPage = ({ currentUser, categories }) => {
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: -1 }}
      className="main-bg-color"
    >
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <BreadCrumb />
        <main className="main-bg-color card border-0 shadow-sm p-3">
          <div className="row">
            <form action="/api/profile/setting/new" method="POST">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <h5>USER INFO</h5>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="name"
                      defaultValue={currentUser.firstName}
                      name="firstName"
                    />
                    <input type="hidden" name="userId" value={currentUser.id} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">LastName</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="lastName"
                      defaultValue={currentUser.lastName}
                      name="lastName"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="email"
                      defaultValue={currentUser.email}
                      disabled
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="password"
                      defaultValue={currentUser.password}
                      name="password"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <h5>CATEGORY</h5>
                  <div className="col-sm-10 offset-sm-2">
                    {/* index the categories */}
                    {categories.map((category) => {
                      const selected =
                        category.Settings?.length > 0 ? "checked" : null;
                      return (
                        <div key={category.id} className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={category.code}
                            name="category"
                            value={category.id}
                            defaultChecked={selected}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={category.code}
                          >
                            {category.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <h5>LEVEL</h5>
                  <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Beginer"
                        checked="checked"
                        disabled="disabled"
                      />
                      <label className="form-check-label" htmlFor="Beginer">
                        Easy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Hard"
                        disabled="disabled"
                      />
                      <label className="form-check-label" htmlFor="Hard">
                        Medium
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Advance"
                        disabled="disabled"
                      />
                      <label className="form-check-label" htmlFor="Advance">
                        Hard
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </form>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default SettingPage;
export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  if (session) {
    let currentUser = await userController.findByEmail(session.user);
    let categories = await questionController.userCategories(currentUser.id);
    console.log("all data", categories);
    return {
      props: {
        currentUser,
        categories,
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
