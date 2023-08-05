import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react";
const Profile = ({session}) => {
  const [creds, setCreds] = useState({ name: '', email: '', mailid: '', isLoginFirstTime: null })
  const [user, setUser] = useState({})
  const [pass, setPass] = useState('')
  const router = useRouter()
  useEffect(() => {
    const res = fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/getuser`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id: session.user_id })
    })
    res.then(response => {
      response.json().then(json => {
        console.log(json)
        if (json.user.isLoginFirstTime) {
          setCreds({ name: json.user.name, email: json.user.email, mailid: json.user.mailAddress, isLoginFirstTime: true })

        }
        else {
          setCreds({ name: json.user.name, email: json.user.email, mailid: json.user.mailAddress, isLoginFirstTime: false })
          setUser(json)

        }

        setPass(json.pass)
        toast.success('Yay! Your profile is loaded!', {
          position: process.env.NEXT_PUBLIC_TOAST_TYPE,
          autoClose: 1000,
          className: 'text-lg',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
    })
  }, [])
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }
  const changeDetails = async () => {
    let res = await fetch('/api/private/changeuser', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({isLoginFirstTime: creds.isLoginFirstTime, name: creds.name, token: localStorage.getItem('user') })
    })
    let a = await res.json()
    if (a.success) {
      // toast.dismiss();
      toast.success(a.msg, {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        className: 'text-lg',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      console.log("jh", a)
      toast.error(a.error, {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        className: 'text-lg',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className='dark:bg-gray-800 dark:text-white'>
      <ToastContainer
        position={process.env.NEXT_PUBLIC_TOAST_TYPE}
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <h1 className="text-3xl font-bold text-center my-5">Your Profile</h1>
      <div className='mx-auto flex my-10'>

        <div className="px-2 w-1/2" >
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name (Set your name here to get your ToolsApp mail id.)</label>
            <input onChange={onChange} value={creds.name} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className="px-2 w-1/2" >
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>
            <input disabled value={creds.email} type="email" id="email" name="email" className="w-full bg-white disabled:bg-gray-300 rounded border border-gray-300 focus:border-blue-500\ focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className="px-2 w-1/2" >
        <div className=" mb-4">
          <label htmlFor="mailid" className="leading-7 text-sm text-gray-600">ToolsApp Mail id (You can message anyone who is signed in the ToolsApp by this mail id. Only works on ToolsApp)</label>
          <input onChange={onChange} value={creds.mailid} disabled type="text" id="mailid" name="mailid" className="w-full bg-white rounded border border-gray-300 disabled:bg-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="mx-4 my-0">
        <button onClick={changeDetails} className="inline text-white bg-blue-500 border-0 py-1 px-2 focus:outline-none  hover:bg-blue-600 rounded text-lg w-full">Change your details</button>
      </div>
      <h1 className="text-3xl font-bold text-center my-5">Your Account Details</h1>
      <div className='mx-auto flex my-10'>
        <div className="px-2 w-1/2" >
        <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Messages allowed to sent</label>
            <input disabled value={user.messagesAllowed} type="messagesAllowed" id="messagesAllowed" name="messagesAllowed" className="w-full bg-white disabled:bg-gray-300 rounded border border-gray-300 focus:border-blue-500\ focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2" >
        <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Messages sent by you</label>
            <input disabled value={user.messagesSent} type="email" id="email" name="email" className="w-full bg-white disabled:bg-gray-300 rounded border border-gray-300 focus:border-blue-500\ focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className='mx-auto flex my-10'>
      <div className="px-2 w-1/2" >
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Notes allowed to create</label>
            <input disabled onChange={onChange} value={user.notesCreatedAllowed} type="name" id="notesCreatedAllowed" name="notesCreatedAllowed" className="w-full disabled:bg-gray-300 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      <div className="px-2 w-1/2" >
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Notes created by you</label>
            <input disabled onChange={onChange} value={user.notesCreated} type="name" id="notesCreated" name="notesCreated" className="w-full disabled:bg-gray-300 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(context){
  let session = getSession(context)
  return {
    props:{
      session: JSON.parse(JSON.stringify(session))
    }
  }
}



export default Profile