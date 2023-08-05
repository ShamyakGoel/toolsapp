import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Message from '../../models/Message';
import User from "../../models/User"
import mongoose from 'mongoose';
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {getSession} from 'next-auth/react'
const Mymsg = ({msg, error, session}) => {
  const router = useRouter();
  if(error!=null){
    toast.error(error, {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
  }
  console.log(session)
    if(!session){
        toast.error("You are not signed in! Please sign in.", {
            position: process.env.NEXT_PUBLIC_TOAST_TYPE,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
  
  function getBody(){
    return {__html: msg.body};
  }
  const l = msg;
  let r = 0;
  let d = new Date(msg.createdAt);

  const months = ["January", "February", "March", "April", "May", "June","July", "August","September", "October", "November","December"]
  const mydate = `${d.getDate()}, ${months[d.getMonth()]} ${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return (
    <div className='min-h-screen'>
                  <ToastContainer
          position={process.env.NEXT_PUBLIC_TOAST_TYPE}
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
    {error ==null ? <div className=''>
              <ToastContainer
          position={process.env.NEXT_PUBLIC_TOAST_TYPE}
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
            <p className="font-roboto mx-20 text-2xl">{msg.subject}</p>
            <hr />
            

        <div className='flex justify-between' >
            <div className='left-div inline'>
                <img src="/defaultuser.png" className='mx-2 rounded-full inline' alt="" />
                <b className='inline'>{msg.userfrom.name} </b>
                <p className="font-roboto text-sm inline">&lt;{msg.from}&gt;</p>
            </div>
            <div className='right-div inline mx-4 '>
                <p className='inline text-sm'>{                    
                    mydate
                } </p>
            </div>
        </div>
        <div className='mx-10 bg-white'>
            <div dangerouslySetInnerHTML={getBody()}>

            </div>
        </div>
        <div>
            
        </div>
    </div>: error}
    </div>
  )
}

export async function getServerSideProps(context){
    try{
    if(!mongoose.connection[0]){
        await mongoose.connect(process.env.MONGO_URI);
    }
    const {id} = context.query;
    const msg = await Message.findById(id);
    const session = await getSession(context);
    if(msg == null){
        return {
            props:{
                msg: {},
                error: "Message not found!"
            }
        }
    }
    let modifiedMsg = {};
    modifiedMsg.subject = msg.subject
    modifiedMsg.body = msg.body
    modifiedMsg.to = msg.to
    modifiedMsg.from = msg.from
    modifiedMsg.createdAt = msg.createdAt
    let userto = await User.findById(msg.userto);
    let userfrom = await User.findById(msg.userfrom);
    modifiedMsg.userto = userto;
    modifiedMsg.userfrom = userfrom;
    return {
        props:{
            msg: JSON.parse(JSON.stringify(modifiedMsg)),
            error: null,
            session
        }
    }
}catch(er){
    console.log(er)
    return {
        props:{
            msg: {},
            error: "Message not found!"
        }
    }   
}
}


export default Mymsg