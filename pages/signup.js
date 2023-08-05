import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head';
import { useEffect , useRef} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const loadScript = (src) =>
new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve()
  const script = document.createElement('script')
  script.src = src
  script.onload = () => resolve()
  script.onerror = (err) => reject(err)
  document.body.appendChild(script)
})

const Signup = ({mfetchadmin}) => {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const googleButton = useRef(null);
  useEffect(()=>{
    const src = 'https://accounts.google.com/gsi/client'
    const id = "94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponseSignUp,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)
      return () => {
        const scriptTag = document.querySelector(`script[src="${src}"]`)
        if (scriptTag) document.body.removeChild(scriptTag)
      }
  })
  const onChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e) => {
    const id = toast.loading("Signing you up ....")
    e.preventDefault()
    let json;
    json = await mfetchadmin('sendmail', 'POST', {email})
    console.log(json)
    if (json.success) {
      toast.update(id, { render: "Signup Account instructions has been sent to your registered email id.", type: "success", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
      setTimeout(()=>{
        toast.dismiss(id)
      }, 3000)
    }
    else {
      toast.update(id, { render: json.error,  type: "error", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
      setTimeout(()=>{
        toast.dismiss(id)
      }, 3000)
    }
    setEmail("")
  }
  async function handleCredentialResponseSignUp(response) {
    const id = toast.loading("Signing you up ....")
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/sendmail`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({response, google: true})
      })
    let json = await res.json()
    console.log(json)
    if (json.success) {
      toast.update(id, { render: "Signup Request has been initiated. Rediricting you to perform other steps ....", type: "success", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
        toast.dismiss()
        router.push(`${process.env.NEXT_PUBLIC_HOST}/signupc?id=${json.reqid}`)
    }
    else {
      toast.update(id, { render: json.error,  type: "error", isLoading: false, className: 'rotateY animated', position: process.env.NEXT_PUBLIC_TOAST_TYPE});
      setTimeout(()=>{
        toast.dismiss(id)
      }, 3000)
    }
  }
  return (
    <div>
            <Head>
      </Head><>
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
              src="https://source.unsplash.com/500x500/?code,python"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">Sign up to your account</h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href={'/login'} className="font-medium text-gray-600 hover:text-gray-500 cursor-pointer">Login</Link>
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
                  value={email}
                  onChange={onChange}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div className='flex items-center'>
            <div ref={googleButton}></div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </></div>
  )
}

export default Signup