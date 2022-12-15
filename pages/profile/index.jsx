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
import { connect_timeout } from "pg/lib/defaults";
import { motion } from "framer-motion";

const ProfilePage = ({
  currentUser,
  userTests,
  totalPercentage,
  achievements,
  bar_chart_data,
  categoryNames,
  categoryTestsNo,
  categoryColors,
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
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: -1 }}
      className="main-bg-color"
    >
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></Script>

      <div className="container py-3">
        <MainHeader currentUser={currentUser} />

        <main className="main-bg-color">
          <br />
          <div className="row">
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
                            <h2
                              className={
                                item.level == "Bronze"
                                  ? "text-info"
                                  : item.level == "Silver"
                                  ? "text-secondary"
                                  : "text-worning"
                              }
                            >
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
              <Content
                barChartData={bar_chart_data}
                categoryNames={categoryNames}
                categoryTestsNo={categoryTestsNo}
                categoryColors={categoryColors}
              />
            </div>
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card border-0 p-2 shadow-sm mb-3">
                <h6 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-dark">Total Tests</span>
                  <span className="badge bg-primary">
                    {userTests?.count || 0}
                  </span>
                </h6>
                <ul
                  className="list-group mb-3 overflow-scroll"
                  style={{ height: "200px" }}
                >
                  {totalPercentage ? (
                    totalPercentage.map((item) => {
                      return (
                        <li
                          onClick={() => handleShow(item.id)}
                          key={item.id}
                          className="list-group-item d-flex flex-column justify-content-between"
                        >
                          <p style={{margin:"0"}}>{item.category.title}</p>
                          <div
                            className="progress"
                            style={{ height: 18, width: 300 }}
                          >
                            <div
                              className="progress-bar progress-bar-striped active"
                              role="progressbar"
                              aria-label="Example 20px high"
                              style={{ width:item.avg+"%"}}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >{item.avg.toFixed(1)}%
                            </div>
                            
                            
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="list-group-item d-flex justify-content-between">
                      <span>No progress</span>
                    </li>
                  )}
                </ul>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <small>Total (courses)</small>
                  <small className="badge bg-primary">
                    {totalPercentage?.length || 0}
                  </small>
                </li>
              </div>

              {/* search for find a new test or category */}

              {/* <form className="card p-2">
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
              </form> */}

              <div className="card border-0 p-3 shadow-sm mb-3">
                {userTestDetails.length>0
                  ? userTestDetails.map((item) => {
                      return (
                        <li
                          key={item.key}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <small>{item.Category.title}</small>
                          <small>
                            Date:{" "}
                            {new Date(item.test_date).toLocaleDateString()}
                          </small>
                          <small>Score: {item.score}/5</small>
                        </li>
                      );
                    })
                  : <p style={{margin:"0"}}>Click on each category to see the tests result</p>
                }
              </div>
            </div>

            
          </div>
        </main>
      </div>
    </motion.div>
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
    //console.log('all teset of user',groupByCategory)
    const achievements = await userController.userAcheivements(currentUser.id);
    //console.log('all teset of user',achievements)
    //data for charts
    const userTestMonthly = await userController.monthlyTests(currentUser.id);

    let bar_chart_data = [];
    for (let i = 0; i <= 11; i++) {
      let monthScore = 0;
      for (const [index, item] of Object.entries(userTestMonthly)) {
        const m = new Date(item.month).getMonth();
        if (i === m) {
          monthScore = item.total;
        }
      }
      bar_chart_data.push(monthScore);
    }
    const categoryNames = [];
    const categoryTestsNo = [];
    const categoryColors = [];
    for (const [index, item] of Object.entries(groupByCategory)) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      categoryNames.push(item[0].Category.title);
      categoryTestsNo.push(item.length);
      categoryColors.push("#" + randomColor);
    }
    //console.log('all teset of user',groupByCategory)
    return {
      props: {
        currentUser,
        userTests,
        totalPercentage,
        achievements,
        bar_chart_data,
        categoryNames,
        categoryTestsNo,
        categoryColors,
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
