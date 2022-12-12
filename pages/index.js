import { getSession } from "next-auth/react"
import MainHeader from "../components/MainHeader"
import Link from "next/link"
import CardView from "../components/CardView"
import questionController from "../controllers/questionController"

export default function Home({data}) {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>

      <main className="main-bg-color">
            <div className="row px-3 mt-3">
              <div className="card border-0 shadow-sm bg-white profile-quize p-5">
                <h2 className="text-dark">
                  Would you like to improve your memory and learn more?
                </h2>
                <h4 className="pb-5">
                  The SAPEVI platfor is here for you!
                  by doing excercises and answering the questions on technical and general knowledge, you can improve your brain and learn many thing. if you are preparing for university entry exams you have a chance to register here and practice with the bank of questionaries. 
                </h4>
                <Link href={`/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fhome`} className = "text-end">
                  <button className="btn btn-success" >Register Here</button>
                </Link>
              </div>
              {data.map(item=>{
                return (<CardView key={item.id} title={item.title} desc={item.description} tag={item.title} img={item.imgUrl}/>)
              })}
            </div>
        </main>
      </header>
    </div>
  )


}

export async function getServerSideProps(req, res) {
  
  const session = await getSession(req)
  if(session){    
        return {
            redirect: {
            permanent: false,
            destination: `/profile`
            }
        }
    
    
  }
  const data = await questionController.categories()
  return {
    props: {data}
  }

  
}
