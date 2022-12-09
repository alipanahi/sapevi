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

const SettingPage = ({ currentUser }) => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />

            <div className="col-4">
              <form className="card border-0 p-2 bg-white">
                <h5>USER INFO</h5>
                <hr />
                <div class="row mb-3">
                  <label for="inputEmail3" class="col-sm-3 col-form-label-sm">
                    Email
                  </label>
                  <div class="col">
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      id="inputEmail3"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <label
                    for="inputPassword3"
                    class="col-sm-3 col-form-label-sm"
                  >
                    Password
                  </label>
                  <div class="col">
                    <input
                      type="password"
                      class="form-control form-control-sm"
                      id="inputPassword3"
                    />
                  </div>
                </div>
                <hr />
                <div class="row mb-3">
                  <h5>CATEGORY</h5>
                  <div class="col-sm-10 offset-sm-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="computer"
                      />
                      <label class="form-check-label" for="computer">
                        Computer
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="sport"
                      />
                      <label class="form-check-label" for="sport">
                        Sport
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="story"
                      />
                      <label class="form-check-label" for="story">
                        Story
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="math"
                      />
                      <label class="form-check-label" for="math">
                        Math
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Art"
                      />
                      <label class="form-check-label" for="Art">
                        Art
                      </label>
                    </div>
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
                      />
                      <label class="form-check-label" for="Beginer">
                        Beginer
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Hard"
                      />
                      <label class="form-check-label" for="Hard">
                        Hard
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Advance"
                      />
                      <label class="form-check-label" for="Advance">
                        Advance
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
