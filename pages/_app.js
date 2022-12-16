import '../styles/globals.css'

import Head from 'next/head'
// _app.jsx is where we define global properties
import { SessionProvider } from "next-auth/react"
export default function App({
 Component,
 pageProps: { session, ...pageProps },
}) {
 return (
   <>
    <Head>
      <title>SAPEVI</title>
    </Head>
   <SessionProvider session={session}>
     <Component {...pageProps} />
   </SessionProvider> 
  </>
 )
}

