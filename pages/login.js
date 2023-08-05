import { signIn, getProviders, getSession, signOut } from "next-auth/react";
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import Head from 'next/head';
import { AiFillLock } from 'react-icons/ai';
function signin({ providers }) {
  const creds = { 'email': '', password: '' }
  const onChange = () => { }
  return (
    // <div>
    //   {Object.values(providers).map((provider) => {
    //     return (
    //       <div key={provider.name}>
    //         <button onClick={() => signIn(provider.id)}>
    //           Sign in with {provider.name}
    //         </button>
    //       </div>
    //     );
    //   })}
    // </div>
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
          <form className="mt-8 space-y-6 flex flex-col justify-end" action="#" method="POST" >
            {Object.values(providers).map((provider) => {
              if (provider.name == "Credentials") {
                return (
                  <div className="rounded-md shadow-sm -space-y-px" key={provider.name}>
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
                )
              }
            })}

            <div className="flex items-center justify-between">

              {/* <div ref={googleButton}></div> */}

              <div className="text-sm">
                <Link href={'/forgot'} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer" >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                // onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"

              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiFillLock className="h-5 w-5 text-blue-500 group-hover:text-gray-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
          <h3 className="text-xl text-center">Sign in with other providers</h3>

          <div className="flex">
            {Object.values(providers).map((provider) => {
              if (provider.id == 'facebook') {
                return (
                  <div key={provider.name}>
                    <button type="button" onClick={() => { signIn(provider.id) }} className="">
<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-8" data-name="Ebene 1" viewBox="0 0 1024 1024" id="facebook-logo-2019"><path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"></path><path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"></path></svg>
</button>
                  </div>
                )
              }
              if (provider.name == 'Google') {
                return (
                  <div key={provider.name}>
                    <button type="button" onClick={() => { signIn(provider.id) }} className="">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-8" width="2443" height="2500" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                    </button>
                  </div>)
              }
              if (provider.id == 'twitter') {
                return (
                  <div key={provider.name}>
                    <button type="button" onClick={() => { signIn(provider.id) }} className="">
<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-8" viewBox="0 0 16 16" id="twitter"><path fill="#03A9F4" d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"></path></svg>
</button> </div>)
              }
              if (provider.id == 'discord') {
                return (
                  <div key={provider.name}>
                    <button type="button" onClick={() => { signIn(provider.id) }} className="">
<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-8" enableBackground="new 0 0 100 100" viewBox="0 0 100 100" id="discord"><path fill="#6665d2" d="M85.22,24.958c-11.459-8.575-22.438-8.334-22.438-8.334l-1.122,1.282
				c13.623,4.087,19.954,10.097,19.954,10.097c-19.491-10.731-44.317-10.654-64.59,0c0,0,6.571-6.331,20.996-10.418l-0.801-0.962
				c0,0-10.899-0.24-22.438,8.334c0,0-11.54,20.755-11.54,46.319c0,0,6.732,11.54,24.442,12.101c0,0,2.965-3.526,5.369-6.571
				c-10.177-3.045-14.024-9.376-14.024-9.376c6.394,4.001,12.859,6.505,20.916,8.094c13.108,2.698,29.413-0.076,41.591-8.094
				c0,0-4.007,6.491-14.505,9.456c2.404,2.965,5.289,6.411,5.289,6.411c17.71-0.561,24.441-12.101,24.441-12.02
				C96.759,45.713,85.22,24.958,85.22,24.958z M35.055,63.824c-4.488,0-8.174-3.927-8.174-8.815
				c0.328-11.707,16.102-11.671,16.348,0C43.229,59.897,39.622,63.824,35.055,63.824z M64.304,63.824
				c-4.488,0-8.174-3.927-8.174-8.815c0.36-11.684,15.937-11.689,16.348,0C72.478,59.897,68.872,63.824,64.304,63.824z"></path></svg>
                  </button></div>)
              }
            
})}

          </div>
        </div>
      </div>
    </>
  )
};
export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  console.log(session)
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      // csrfToken: await csrfToken(context),
    },
  };
}