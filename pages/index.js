import { getSession } from "next-auth/react";
import MainHeader from "../components/MainHeader";
import Link from "next/link";
import CardView from "../components/CardView";
import questionController from "../controllers/questionController";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export default function Home({ data,topUsers }) {
  return (
    <div
      className="main-bg-color"
    >
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></Script>

      <main className="container py-3">
        <MainHeader />
        <div className="row">
          <div className="col-12 pt-3">
            <div className="card border-0 shadow-sm bg-white profile-quize p-5">
              <h3>Would you like to improve your memory and learn more?</h3>
              <p className="pb-5">
                The SAPEVI platform is here for you! by doing excercises and
                answering the questions on technical and general knowledge, you
                can improve your brain and learn many things. if you are
                preparing for university entry exams you have a chance to
                register here and practice with the bank of questionaries.
              </p>
              <Link
                href={`/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome`}
                className="text-end"
              >
                <button className="btn btn-success">Register with your email</button>
              </Link>
            </div>
          </div>

          {/* top 3 users */}
          <div className="col-12 pt-3">
            <div className="card border-0 shadow-sm p-3">
              <h5>Top 3 learners</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    
                    <th scope="col">Total Score</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.length>0 ? 
                  
                    topUsers.map((item,index)=>{
                      return (<tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.full_name}</td>
                        
                        <td>{item.total}</td>
                        <td>
                            <h4
                              className={
                                index == 2
                                  ? "text-info"
                                  : index == 1
                                  ? "text-secondary"
                                  : "text-warning"
                              }
                            >
                              <FontAwesomeIcon icon={faMedal} />
                            </h4>
                        </td>
                      </tr>)

                    })
                  :
                  <p>No Record available</p>
                  }
                  
                  
                </tbody>
              </table>
            </div>
          </div>

          {/* ferch data */}
          {data.map((item) => {
            return (
              <CardView
                key={item.id}
                title={item.title}
                desc={item.description}
                tag={item.title}
                img={item.imgUrl}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: `/profile`,
      },
    };
  }
  const data = await questionController.categories();
  const topUsers = await questionController.topUsers();
  //console.log('top users',topUsers)
  return {
    props: { data,topUsers },
  };
}
