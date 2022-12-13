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

const SettingPage = ({ currentUser, categories }) => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <BreadCrumb />
        <main className="main-bg-color card border-0 shadow-sm p-3">
          <div className="row">
            <form action="/api/profile/setting/new" method="POST">
              <div className="row">
                <div className="col-sm-1 col-md-4 col-lg-4">
                  <h5>USER INFO</h5>
                  <div class="mb-3">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="name"
                      defaultValue={currentUser.firstName}
                      name="firstName"
                    />
                    <input type="hidden" name="userId" value={currentUser.id} />
                  </div>
                  <div class="mb-3">
                    <label for="email">LastName</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="lastName"
                      defaultValue={currentUser.lastName}
                      name="lastName"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      id="email"
                      defaultValue={currentUser.email}
                      disabled
                      name="email"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control form-control-sm"
                      id="password"
                      defaultValue={currentUser.password}
                      name="password"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-sm-1 col-md-4 col-lg-4">
                  <h5>CATEGORY</h5>
                  <div class="col-sm-10 offset-sm-2">
                    {/* index the categories */}
                    {categories.map((category) => {
                      const selected =
                        category.Settings?.length > 0 ? "checked" : null;
                      return (
                        <div key={category.id} class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id={category.code}
                            name="category"
                            value={category.id}
                            checked={selected}
                          />
                          <label class="form-check-label" for={category.code}>
                            {category.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div class="col-sm-1 col-md-3 col-lg-3">
                  <h5>LEVEL</h5>
                  <div class="col-sm-10 offset-sm-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Beginer"
                        checked="checked"
                        disabled="disabled"
                      />
                      <label class="form-check-label" for="Beginer">
                        Easy
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Hard"
                        disabled="disabled"
                      />
                      <label class="form-check-label" for="Hard">
                        Medium
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Advance"
                        disabled="disabled"
                      />
                      <label class="form-check-label" for="Advance">
                        Hard
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">
                Edit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
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
