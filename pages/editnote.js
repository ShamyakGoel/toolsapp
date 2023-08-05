import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mongoose from 'mongoose';
import Note from '../models/Note';
import { getSession } from "next-auth/react";
const Editnote = ({noteid, title, note,err,session}) => {
  // const {data:session} = useSession()
  const router = useRouter();
    if(err){
        toast.error('The note you want to edit does not exist.', {
            position: process.env.NEXT_PUBLIC_TOAST_TYPE,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        setTimeout(()=>{
            router.push('/login')
        },2000)
    }
  const [creds, setCreds] = useState({title, note, emailid: session.user.email, noteid})
  const onChange = (e)=>{
    setCreds({...creds, [e.target.name]:e.target.value})
  }

  if(!session){
        toast.error('You are not logged in. Redirecting ...', {
            position: process.env.NEXT_PUBLIC_TOAST_TYPE,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        setTimeout(()=>{
            router.push('/login')
        },2000)
      }

  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/editnote`, 
    {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    })
    let json = await res.json()
    if(json.success){
      toast.success('Yay! Your note has been edited successfully!', {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        setTimeout(()=>{
            router.back()
        }, 2000)
    }
    else if(!json.success){
      toast.error(json.err, {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    }
    setCreds({...creds, ['title']: "", ['note']:""})
  }
  return (
    <div>
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
        <section className="text-gray-600 body-font">
    <div className="container mx-10 py-10">
      <div className="flex flex-col mb-3">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Editing {title}</h1>
      </div>
      <div>
        <div className="-m-2">
          <div className="p-2">
            <div className="">
              <label htmlFor="name" className="leading-7  text-gray-600">Title</label>
              <input type="text"  value={creds.title} onChange={onChange} id="title" name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-gray-600">Note</label>
              <textarea value={creds.note} onChange={onChange} id="note" name="note" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div className="p-2 w-full">
            <button onClick={handleSubmit} className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export async function getServerSideProps(context){
    let noteid = context.query.noteid
    let session = await getSession(context)
    if(!noteid){
        return {
            props:{
                err: true
            }
        }
    }
    if(!mongoose.connection[0]){
          await mongoose.connect(process.env.MONGO_URI);
    }
    let note = await Note.findById(noteid);
    return {
        props:{
            noteid,
            title: note.title,
            note: note.note,
            session
        }
    }
}

export default Editnote