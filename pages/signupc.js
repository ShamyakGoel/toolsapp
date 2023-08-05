import {useState, useEffect} from 'react'
import { AiFillLock } from 'react-icons/ai'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link'
import { useRouter } from "next/router"
import SignupReq from "../models/SignupReq"
import mongoose from 'mongoose';
const Signupc = ({success,error,reqid,email, mfetchadmin}) => {
    const router = useRouter()
    const [creds, setCreds] = useState({pass:"",rpass:"", reqid,email})
    useEffect(() => {
        if(!success){
            toast.error(error, {
                position: process.env.NEXT_PUBLIC_TOAST_TYPE,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            router.push('/')
        }
    }, [router.isReady])
        
    const submit = async (e)=>{
        e.preventDefault()
        if(creds.pass !== creds.rpass){
            return toast.error('Passwords not matched', {
                position: process.env.NEXT_PUBLIC_TOAST_TYPE,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
          });
        }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/signup`, {
          method: "POST",
          headers:{
              'Content-type': 'application/json'
          },
          body: JSON.stringify(creds)
      })
      let json = await res.json()
      if(json.success){
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/sendmail`, {
        method: "POST",
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({signup: true, email: creds.email})
    })
    let json1 = await res.json();
      console.log(json,json1)
      if(json1.success){
        toast.success('Your account has been created. You can now login.', {
            position: process.env.NEXT_PUBLIC_TOAST_TYPE,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
      });
      }
      else{
        console.log(json1)
        toast.success('Your account has been created. You can now login.', {
            position: process.env.NEXT_PUBLIC_TOAST_TYPE,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
      });
      }
    //   router.push("/login")
    }
    else{
        toast.error(json.error, {
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
    const onChange = (e)=>{
        setCreds({...creds, [e.target.name]:e.target.value})
    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="/codeswearcircle.png"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set your password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href={'/login'}><a className="font-medium text-pink-600 hover:text-pink-500">
                            login
                        </a></Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="pass" className="sr-only">
                                Password
                            </label>
                            <input
                                id="pass"
                                onChange={onChange}
                                name="pass"
                                type="password"
                                autoComplete="pass"
                                value={creds.pass}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="rpass" className="sr-only">
                                Re-enter Password
                            </label>
                            <input
                                id="rpass"
                                onChange={onChange}
                                name="rpass"
                                type="password"
                                autoComplete="rpass"
                                value={creds.rpass}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                                placeholder="Re-enter Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={submit}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                            <span  className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <AiFillLock className="h-5 w-5 text-pink-500 group-hover:text-pink-400" aria-hidden="true" />
                            </span>
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
      }
    let reqid = context.query.id;
    let request = await SignupReq.findOne({reqid})
    if(!request){
        return {
            props: {error: "No such signup request!", success:false}, 
        }
    }
    else {
        return {
            props: {reqid, success:true, email:request.email}
        }
    }
}

export default Signupc