import { getSession } from "next-auth/react"
import MainHeader from "../components/layout.js/main-header"
import userController from "../controllers/userController"
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useState,useEffect } from "react";

export default function Home({ flats }) {

  const [search,setSearch] = useState('')
  const [allFlats,setAllFlats] = useState(flats)
  const [isLoading, setLoading] = useState(false)
  

  

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
  if (session) {
    let currentUser = await userController.findByEmail(session.user)

      return {
        redirect: {
          permanent: false,
          destination: `/profile`
        }
      }
    

  }

  // get all flats from flatController
  
  return {
    props: {  }
  }

}
