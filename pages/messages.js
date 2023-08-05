import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react"
const Messages = ({ mfetchadmin, session }) => {
  const [creds, setCreds] = useState({ title: "", note: "", userid: "" })
  const [myrmessages, setmyrmessages] = useState([])
  const [mysmessages, setmysmessages] = useState([])
  // const [len, setLen] = useState(0)
  const router = useRouter();
  function read(msgid) {
    toast.dismiss();
    router.push("/message/" + msgid)
  }

  async function deletemsg(msgid, from) {
    toast.dismiss();
    let json = await mfetchadmin('message/deletemsg', 'POST', { message_id: msgid, inote_id: session.inote_id, from });
    if (json.success) {
      toast.success('Message has been deleted!', {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    else {
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
  useEffect(() => {
    const fetchmyrmessages = async () => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/message/fetchmsg`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'inote_id': session.inote_id, 'mine': false })
      });
      let json = await res.json();
      console.log(json)
      setmyrmessages(json.allmsg)
      // setLen(json.mymessages.length)
    }
    const fetchmysmessages = async () => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/private/message/fetchmsg`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'inote_id': session.inote_id, 'mine': true })
      });
      let json = await res.json();
      console.log(json)
      setmysmessages(json.allmsg)
      // setLen(json.mymessages.length)
    }

    if (session) {
      setCreds({ ...creds, 'userid': session.user_id })
      fetchmyrmessages();
      fetchmysmessages();
    }
    else {
      toast.error('You are not logged in. Redirecting ...', {
        position: process.env.NEXT_PUBLIC_TOAST_TYPE,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }


  }, [router.isReady])
  return (
    <div>
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
      <div className="w-full container my-3 mb-10">
        <h2 className='text-2xl text-center font-bold'>InBox</h2>
        <div className="overflow-x-auto relative w-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
              <tr>
                <th scope="col" className="py-3 px-6">
                  S.no
                </th>
                <th scope="col" className="py-3 px-6">
                  Select
                </th>
                <th scope="col" className="py-3 px-6">
                  From
                </th>
                <th scope="col" className="py-3 px-6">
                  Subject
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='w-full' >
              {
                myrmessages.map((mymessage, index) => {
                  return <tr key={mymessage._id} onDoubleClick={() => { read(mymessage._id) }} className="bg-white w-full border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td>
                      <div class="ml-7">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {mymessage.to == session.inote_id ? "me" : mymessage.to}
                    </td>
                    <td className="py-4 px-6">
                      {mymessage.subject}
                    </td>
                    <td className="py-4 px-6">
                      <button className="inline-flex ml-3 text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { deletemsg(mymessage._id, session.inote_id) }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>

      </div>
      <div className="container my-3 mb-10">
        <h2 className='text-2xl text-center font-bold'>OutBox</h2>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  S.no
                </th>
                <th scope="col" className="py-3 px-6">
                  From
                </th>
                <th scope="col" className="py-3 px-6">
                  Subject
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                mysmessages.map((mymessage, index) => {
                  return <tr key={mymessage._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="py-4 px-6">
                      {mymessage.from == session.inote_id ? "YOU" : mymessage.from}
                    </td>
                    <td className="py-4 px-6">
                      {mymessage.subject}
                    </td>
                    <td className="py-4 px-6">
                      <button className="inline-flex text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 read" onClick={() => { read(mymessage._id) }}>
                        Read
                      </button>
                      <button className="inline-flex ml-3 text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { deletemsg(mymessage._id, session.inote_id) }}>
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("apprunning")
  return {
    props: {
      session
    }
  };
};

export default Messages