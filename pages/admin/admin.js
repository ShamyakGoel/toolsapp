import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
export default function AdminHome() {
  return (
    
    <div>

      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">ToolsApp</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed">Welcome to the admin console. Here&apos;s a list of options</p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Manage users</h2>
        <p className="leading-relaxed text-base mb-4">Manage</p>
        <div className="text-indigo-500 inline-flex items-center"><Link href={'/admin/mnusers'}>Go to</Link>
        
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          </div>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Change password</h2>
        <p className="leading-relaxed text-base mb-4">Change</p>
        <div className="text-indigo-500 inline-flex items-center"><Link href={'/admin/changepass'}>Go to</Link>
        
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          </div>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">About us</h2>
        <p className="leading-relaxed text-base mb-4">About us</p>
        <div className="text-indigo-500 inline-flex items-center"><Link href={'/notes'}>Go to</Link>
        
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          </div>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Contact us</h2>
        <p className="leading-relaxed text-base mb-4">Contact us</p>
        <div className="text-indigo-500 inline-flex items-center"><Link href={'/contact'}>Go to</Link>
        
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
