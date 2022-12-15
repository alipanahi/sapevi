import React, { useState } from "react";
import { getSession } from "next-auth/react";
import userController from "../../controllers/userController";
import quizController from "../../controllers/quizController";
import MainHeader from "../../components/MainHeader";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Script from "next/script";
import Content from "../../components/Content";

const ProfilePage = ({
  currentUser,
  userTests,
  totalPercentage,
  achievements,
  bar_chart_data
}) => {
  const [userTestDetails, setUserTestDetails] = useState([]);
  const handleShow = (category_id) => {
    const postData = { user: currentUser.id, category: category_id };
    const details = fetch("/api/profile/categoryTests", {
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserTestDetails(data);
      });
  };
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
          <br/>
          <div className="row">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-dark">Total Tests</span>
                <span className="badge bg-primary rounded-pill">
                  {userTests?.count || 0}
                </span>
              </h4>
              <div
                className="card border-0 p-2 shadow-sm mb-4"
                style={{ overflow: "scroll", height: "150px" }}
              >
                <ul className="list-group mb-3">
                  {totalPercentage ? (
                    totalPercentage.map((item) => {
                      return (
                        <li
                          onClick={() => handleShow(item.id)}
                          key={item.id}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <div className="progress" style={{ height: 20 }}>
                            <div
                              className="progress-bar bg-success text-white-50"
                              role="progressbar"
                              aria-label="Example 20px high"
                              style={{ width: item.avg * 3 }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {item.category.title}
                            </div>
                          </div>

                          <span className="text-muted">
                            {item.avg.toFixed(2)}%
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="list-group-item d-flex justify-content-between">
                      <span>No progress</span>
                    </li>
                  )}

                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <span>Total (courses)</span>
                    <strong>{totalPercentage?.length || 0}</strong>
                  </li>
                </ul>
              </div>

              <form className="card p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Find a course"
                  />
                  <button type="submit" className="btn btn-secondary">
                    Find
                  </button>
                </div>
              </form>
              <br />
              <div className="card border-0 p-2 shadow-sm mb-4">
                <ul className="list-group mb-3">
                  {userTestDetails
                    ? userTestDetails.map((item) => {
                        return (
                          <li
                            key={item.key}
                            className="list-group-item d-flex justify-content-between"
                          >
                            <div>{item.Category.title}</div>
                            <strong>
                              Date:{" "}
                              {new Date(item.test_date).toLocaleDateString()}
                            </strong>
                            <strong>Score: {item.score}</strong>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>

            <div className="col-md-7 col-lg-8">
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
                <Link href={`/quiz-list`}>
                  <button className="btn btn-success">Start Now</button>
                </Link>
              </div>
              <h4 className="my-3">Achievements</h4>
              <div className="row">
                {achievements
                  ? achievements.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="col-sm-2 col-md-6 col-lg-4 mb-4"
                        >
                          <div className="card border-0 shadow-sm bg-white p-3 text-center rounded-3">
                            <h2 className="text-warning">
                              <FontAwesomeIcon icon={faMedal} />
                            </h2>
                            <span className="lead">{item.Category.title}</span>
                            <span>
                              <small>{item.level}</small>
                            </span>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <Content barChartData={bar_chart_data}/>
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
    //get all user tests including category details
    const userTests = await quizController.userTests(currentUser.id);
    //do a group by category
    const groupByCategory = userTests.rows.reduce((group, test) => {
      const { CategoryId } = test;
      group[CategoryId] = group[CategoryId] ?? [];
      group[CategoryId].push(test);
      return group;
    }, {});
    let totalPercentage = [];
    for (const [key, test] of Object.entries(groupByCategory)) {
      let totalTest = 0;
      const average = test.map((item) => {
        totalTest++;
        //percentage of every test
        return {
          avg: (item.score * 100) / item.number_questions,
          category: item.Category,
        };
      });
      let totalPer = 0;
      let categoryDetails = "";
      for (const [index, avg] of Object.entries(average)) {
        //average of every category
        totalPer += avg.avg;
        categoryDetails = avg.category;
      }
      //const per = average.reduce((a,b)=>a+b)
      const categoryPercentage = totalPer / average.length;
      totalPercentage.push({
        id: key,
        avg: categoryPercentage,
        category: categoryDetails,
        total: totalTest,
      });
    }
    //console.log('all teset of user',totalPercentage)
    const achievements = await userController.userAcheivements(currentUser.id);
    //console.log('all teset of user',achievements)
    //data for charts
    const bar_chart_data = [65, 59, 40, 51, 56, 55, 40, 57, 40, 48, 59, 62]
    return {
      props: { currentUser, userTests, totalPercentage, achievements,bar_chart_data },
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
