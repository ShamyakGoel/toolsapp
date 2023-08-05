import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react";

const Notes = ({mfetchadmin, session}) => {
  const [creds, setCreds] = useState({title: "", note:"", emailid: ""})
  const [notes, setNotes] = useState([])
  const [myuser, setMyUser] = useState('')
  // const [len, setLen] = useState(0)
  const router = useRouter();
  useEffect(()=>{
    console.log("runn")
    const fetchNotes = async ()=>{
      let json = await mfetchadmin('fetchnotes', 'POST', {emailid: session.user.email});
      setNotes(json.notes)
    }
    if(session){
        setMyUser(session.user.email);
        setCreds({...creds, 'emailid': session.user.email})
        fetchNotes()
    }
    else{
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
  }, []) 
  const onChange = (e)=>{
    setCreds({...creds, [e.target.name]:e.target.value})
  }

    
    
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let json = await mfetchadmin(`addnote`, 'POST', creds)
    if(json.success){
      toast.success('Yay! Your note has been added successfully!', {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        reload()
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
    // setCreds({...creds, ['title']: "", ['note']:""})
  }

  const edit = (noteid, title, note) =>{
    router.push(`/editnote?noteid=${noteid}`)
  }
  const deletenote = async (noteid, index) =>{
    document.getElementById(`note${index}`).classList.add("disabled")
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/deletenote`, {
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({noteid,emailid: myuser})
    })
    let json = await res.json();
    if(json.success){
      toast.success('Yay! Your note has been deleted successfully!', {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        reload()
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
  }
  const reload = async() =>{
    const user = JSON.parse(localStorage.getItem('user'));
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/fetchnotes`, {
      method:"POST",

      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'emailid': session.user.email})
    });
    let json = await res.json();
    setNotes(json.notes)
    // setLen(json.notes.length)
  }
  return (
    <div>
      {/* {fetchNotes()} */}
            <ToastContainer
          position={process.env.NEXT_PUBLIC_TOAST_TYPE}
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLose={false}
          draggable
          pauseOnHover={false}
        />
        <section className="text-gray-600 body-font">
    <div className="container mx-10 py-10">
      <div className="flex flex-col mb-3">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add a note</h1>
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
            <button onClick={handleSubmit} id="sub" className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="container my-3 mb-10">
    <h2 className='text-2xl text-center font-bold'>Your notes</h2>
<div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    S.no
                </th>
                <th scope="col" className="py-3 px-6">
                    Note title
                </th>
                <th scope="col" className="py-3 px-6">
                    Note description
                </th>
                <th scope="col" className="py-3 px-6">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {            
            notes.map((mynote ,index)=>{
              return             <tr key={mynote._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index+1}
              </th>
              <td className="py-4 px-6">
                  {mynote.title}
              </td>
              <td className="py-4 px-6">
              {mynote.note}
              </td>
              <td className="py-4 px-6">
              <button className="inline-flex text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 edit" onClick={()=>{edit(mynote._id, mynote.title, mynote.note)}} id={`${mynote._id}`}>
                      Edit
                      </button>
                  <button id={`note${index}`} className="inline-flex ml-3 text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{deletenote(mynote._id, index)}}>
                      Delete
                      </button>
              </td>
          </tr>
            })}
        </tbody>
    </table>
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

export default Notes