import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AiFillLock } from 'react-icons/ai';


const AdminLogin = () => {
  const googleButton = useRef(null);
  const router = useRouter()
  const [creds, setCreds] = React.useState({ email: "", password: "" })
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }
  React.useEffect(() => {
    if (localStorage.getItem('adminuser')) {
        toast.error('You are already logged in.', {
            position: process.env.NEXT_PUBLIC_TOAST_TYPE,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
      router.replace(`${process.env.NEXT_PUBLIC_HOST}/admin`)
    }
  }, [])


  const handleSubmit = async (e) => {
    const id = toast.loading("Signing you in ....")
    e.preventDefault()
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/admin/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
      })
    let json = await res.json()
    console.log(json)
    if (json.success) {
      toast.update(id, { render: "Yay! You are successfully logged in!  Redirecting..", type: "success", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
      localStorage.setItem('aduser', JSON.stringify({ authtoken: json.authtoken, loggedin: true }))
      setTimeout(() => {
        toast.dismiss()
      }, 2000);
    }
    else {
      toast.update(id, { render: json.error,  type: "error", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
      setTimeout(()=>{
        toast.dismiss(id)
      }, 3000)
    }
    setTimeout(() => {
      toast.update(id, { render: "It seems that your network connection is lost. Try to login again after sometime.", type: "error", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
    }, 11000);
    setCreds({ email: "", password: "" })
  }

  return (
    <>
      <Head>
      </Head>
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://source.unsplash.com/500x500/?code,python"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">Sign in to your account</h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href={'/signup'} className="font-medium text-gray-600 hover:text-gray-500 cursor-pointer">Signup</Link>
            </div>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  value={creds.email}
                  onChange={onChange}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={creds.password}
                  onChange={onChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">

              <div ref={googleButton}></div>

              <div className="text-sm">
                <Link href={'/forgot'} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer" >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"

              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiFillLock className="h-5 w-5 text-blue-500 group-hover:text-gray-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLogin