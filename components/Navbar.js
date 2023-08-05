import React from 'react'
import Link from 'next/link';
import { getSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
const Navbar = ({session}) => {
    console.log(session)
    const logout = ()=>{
        signOut()
        toast.success("Successfully logged out");
    }
    return (
        <div>
                    <ToastContainer
          position={process.env.NEXT_PUBLIC_TOAST_TYPE}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">ToolsApp</span>
                    </a>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <Link href={'/'} ><a className="mr-5 hover:text-gray-900">Home</a></Link>
                        <Link href={'/'} ><a className="mr-5 hover:text-gray-900">About</a></Link>
                        <Link href={'/contact'}><a className="mr-5 hover:text-gray-900">Contact Us</a></Link>
                        {session && <div>
                            <Link href={'/notes'}><a className="mr-5 hover:text-gray-900">Notes</a></Link>
                        <Link href={'/message'}><a className="mr-5 hover:text-gray-900">Message</a></Link>
                        <Link href={'/messages/'}><a className="mr-5 hover:text-green-600">Your messages</a></Link>
                            </div>}
                        
                    </nav>
                    {!session ? <div><Link href={"/login"}><a className="inline-flex text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                        </a>
                    </Link>                    
                    <Link href={"/signup"}><a className="ml-2 inline-flex text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Signup
                        </a>
                    </Link>
                    </div> :<div><a onClick={logout} className="inline-flex text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2">
                        Logout
                    </a>
                    <Link href={"/profile"}><a className="ml-2 inline-flex text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Profile
                        </a>
                    </Link></div>}

                </div>
            </header>
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

export default Navbar