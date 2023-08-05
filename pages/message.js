import React, { useState,useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {getSession} from 'next-auth/react' 
const Message = ({session}) => {
  const editorRef = useRef(null);
  const [creds, setCreds] = useState({to: "", subject: "", body:"", from:session.inote_id})
  const onChange= (e)=>{
    setCreds({...creds, [e.target.name]: e.target.value})
  }
  const onChangebody= (e)=>{
    setCreds({...creds, ['body']: editorRef.current.getContent()})
  }
  
    const handleSubmit = async (e)=>{
      e.preventDefault()
      if(creds.body == "" || creds.body == `<div>
      <div>&amp;#8203;</div>
      </div>`){
        toast.error("Body can't be empty!", {
          position: process.env.NEXT_PUBLIC_TOAST_TYPE,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
          return;
      }
      if(creds.subject == "" || creds.subject == "&#8203;"){
        toast.error("Subject can't be empty!", {
          position: process.env.NEXT_PUBLIC_TOAST_TYPE,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
          return;
      }
      if(creds.to == "" || creds.to == "&#8203;"){
        toast.error("To can't be empty!", {
          position: process.env.NEXT_PUBLIC_TOAST_TYPE,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
          return;
      }
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/message/sendmsg`, 
      {
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
      })
      let json = await res.json()
      console.log(json)
      if(json.success){
        toast.success('Message sent to '+json.userto.name, {
          position: process.env.NEXT_PUBLIC_TOAST_TYPE,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
      }
      else{
        toast.error(json.err, {
          position: process.env.NEXT_PUBLIC_TOAST_TYPE,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
      }
    }
    if(session == null){
      toast.error('You are not logged in. Redirecting ...', {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 3000,
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
      <div className="container mx-10 py-10">
      <div className="flex flex-col mb-3">
        <h1 className="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">Send a message</h1>
      </div>
      <div>
        
        <div className="-m-2">
          <div className="p-2">
            <div className="">
              <label htmlFor="name" className="leading-7  text-gray-600">To (Mail id)</label>
              <input type="text"  value={creds.to} onChange={onChange} id="to" name="to" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2">
            <div className="">
              <label htmlFor="name" className="leading-7  text-gray-600">Subject</label>
              <input type="text"  value={creds.subject} onChange={onChange} id="subject" name="subject" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-full">
            <p>Body</p>
          <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        onChange={onChangebody}
        id="tiny-react_62325657731667713932479"
        init={{
        height: 300,
        menubar: false,
        plugins: [
           'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
           'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
           'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
        ],
        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
           'alignleft aligncenter alignright alignjustify | ' +
           'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
           menu: {
            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
          },
          menubar: 'favs file edit view insert format tools table help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
    />
          </div>
          <div className="p-2 w-full">
            <button onClick={handleSubmit} id="sub" className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded">Send message</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return {
    props:{
    session
    }
  };
};

export default Message