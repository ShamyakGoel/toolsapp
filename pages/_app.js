import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SessionProvider, getSession } from "next-auth/react"
import {ToastContainer, toast} from "react-toastify"
import Head from 'next/head'
function MyApp({ Component, pageProps, }) {
  const router = useRouter();
  const [pathname, setPathname] = useState("")
  const [navkey, setNavkey] = useState(0)
  // console.log("app", pageProps)
  useEffect(() => {
      setNavkey(Math.random())
      if(!navigator.onLine){
        toast.error("You are not connected to the internet. Check your internet connection")
      }
      let fchar = router.pathname.charAt(1).toUpperCase()
      let p = fchar + router.pathname.replace("/", "").slice(1)
      setPathname(p)
  }, [router.pathname])
  async function mfetchadmin(endpoint, method,  data=''){
    if(method=="POST"){
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/${endpoint}`, {
      method: method,
      headers:{
        'Content-type': "application/json",
        "Authorization": process.env.NEXT_PUBLIC_API_VERIFY
      },
      body: JSON.stringify(data)
    })
    let json = await res.json();
    return json;
    }else{
      let res = await fetch  (`${process.env.NEXT_PUBLIC_HOST}/api/private/${endpoint}`, {
        method: method,
        headers:{
          'Content-type': "application/json",
          "Authorization": process.env.NEXT_PUBLIC_API_VERIFY
        }
      })
      let json = await res.json();
      return json;
    }
    
  }



  

  
  return <SessionProvider refetchInterval={5 * 60} ><>      <Head>
  <title>
  ToolsApp.site | {pathname == "/" ? "Home" : pathname}
  </title>
  {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9903064375139191"
     crossorigin="anonymous"></script> */}
  <meta name="description" content="Tired of writing notes in diary?, Now, you don't have to worry. You can save your notes on iNotes and edit, delete, read them. You can also send messages to someone who is logged in the iNotes." />
  <meta lang='en-in' />
  <meta name="robots" content="INDEX,FOLLOW"></meta>
</Head><Navbar key={navkey}/><Component mfetchadmin={mfetchadmin} {...pageProps} /><Footer/></></SessionProvider>
}



export default MyApp
