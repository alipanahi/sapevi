import { getSession } from "next-auth/react"
import userController from "../controllers/userController"
import MainHeader from "../components/MainHeader"

export default function Home(props) {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>

        <main>
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            
          </div>

        </main>
      </header>
    </div>
  )


}

export async function getServerSideProps(req, res) {
  const session = await getSession(req)
  if(session){
    let currentUser = await userController.findByEmail(session.user)
    
        return {
            redirect: {
            permanent: false,
            destination: `/profile`
            }
        }
    
    
  }else{
    return {
        redirect: {
        permanent: false,
        destination: `/home`
        }
    }
  }
  
}
