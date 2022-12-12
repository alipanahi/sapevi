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

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />

            <div className="col-4">
              <form
                className="card border-0 p-2 bg-white"
                action="/api/profile/setting/new"
                method="POST"
              >
                <h5>USER INFO</h5>
                <hr />
                <div class="row mb-3">
                  <label for="name" class="col-sm-3 col-form-label-sm">
                    Name
                  </label>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="name"
                      defaultValue={currentUser.firstName}
                      name="firstName"
                    />
                    <input type="hidden" name="userId" value={currentUser.id} />
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="email" class="col-sm-3 col-form-label-sm">
                    LastName
                  </label>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="lastName"
                      defaultValue={currentUser.lastName}
                      name="lastName"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="email" class="col-sm-3 col-form-label-sm">
                    Email
                  </label>
                  <div class="col">
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      id="email"
                      defaultValue={currentUser.email}
                      disabled
                      name="email"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="password" class="col-sm-3 col-form-label-sm">
                    Password
                  </label>
                  <div class="col">
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
                <hr />
                <div class="row mb-3">
                  <h5>CATEGORY</h5>
                  <div class="col-sm-10 offset-sm-2">
                    {/* index the categories */}
                    {categories.map((category) => {
                      const selected = category.Settings?.length>0 ? "checked" : null
                      return (
                      <div key={category.id} class="form-check">
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
                    )})}
                  </div>
                </div>
                <hr />
                <div class="row mb-3">
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
                <button type="submit" class="btn btn-primary">
                  Edit
                </button>
              </form>
            </div>

            <QuizCardView
              img="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
              title="Computer"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
                    facere dignissimos nihil quibusdam illum id assumenda animi a
                    suscipit minus dolorem error molestiae, quasi, autem vitae
                    aspernatur odio magnam facilis."
              questions="10"
              time="5"
              level="Beginer"
            />
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
    console.log('all data',categories);
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
