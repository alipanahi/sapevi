import React from "react";
import { getSession } from "next-auth/react";
import userController from "../../controllers/userController";
import MainHeader from "../../components/MainHeader";
import "bootstrap/dist/css/bootstrap.css";
import BreadCrumb from "../../components/BreadCrumb";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = ({ currentUser }) => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />
          </div>

          <div class="row">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-dark">Your pourses progresses</span>
                <span class="badge bg-primary rounded-pill">3</span>
              </h4>
              <div className="card border-0 p-2 shadow-sm mb-4">
                <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div class="progress" style={{ height: 20 }}>
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        aria-label="Example 20px high"
                        style={{ width: 350 }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        Computer
                      </div>
                    </div>
                    <span class="text-muted">100%</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div class="progress" style={{ height: 20 }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        aria-label="Example 20px high"
                        style={{ width: 250 }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        Story
                      </div>
                    </div>
                    <span class="text-muted">70%</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div class="progress" style={{ height: 20 }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        aria-label="Example 20px high"
                        style={{ width: 200 }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        Math
                      </div>
                    </div>
                    <span class="text-muted">60%</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Total (courses)</span>
                    <strong>3</strong>
                  </li>
                </ul>
              </div>

              <form class="card p-2">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Find a course"
                  />
                  <button type="submit" class="btn btn-secondary">
                    Find
                  </button>
                </div>
              </form>
            </div>

            <div class="col-md-7 col-lg-8">
              <h4 class="mt-3">Your Profile</h4>
              <div className="card border-0 shadow-sm bg-white profile-quize p-5">
                <h3 className="text-dark">
                  Complate a course from zero to Mastery
                </h3>
                <p className="pb-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem dolorem aspernatur fuga repellendus, cumque in nisi
                  nobis modi asperiores labore non veritatis aliquid magnam,
                  dolore eveniet ad at voluptatem aliquam
                </p>
                <button className="btn btn-outline-success">Start Now</button>
              </div>
              <h4 class="my-3">Achievements</h4>
              <div className="row">
                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Computer</span>
                    <span>
                      <small>Level 1</small>
                    </span>
                  </div>
                </div>
                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Story</span>
                    <span>
                      <small>Level 3</small>
                    </span>
                  </div>
                </div>

                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Sport</span>
                    <span>
                      <small>Level 3</small>
                    </span>
                  </div>
                </div>

                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Math</span>
                    <span>
                      <small>Level 4</small>
                    </span>
                  </div>
                </div>

                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Siance</span>
                    <span>
                      <small>Level 1</small>
                    </span>
                  </div>
                </div>

                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Music</span>
                    <span>
                      <small>Level 4</small>
                    </span>
                  </div>
                </div>

                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Public</span>
                    <span>
                      <small>Level 1</small>
                    </span>
                  </div>
                </div>

                <div className="col-3 mb-4">
                  <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                    <h2 className="text-dark">
                      <FontAwesomeIcon icon={faMedal} />
                    </h2>
                    <span className="lead">Natural</span>
                    <span>
                      <small>Level 1</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  if (session) {
    let currentUser = await userController.findByEmail(session.user);

    return {
      props: { currentUser },
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
