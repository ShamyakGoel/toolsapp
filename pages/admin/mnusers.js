import React from 'react'
import User from "../../models/User"
import mongoose from 'mongoose';
const mnusers = ({ users }) => {
    function handleDisable(e){
        if(e.target.checked){
            
        }
        else{

        }
    }
    return (
        <div className='min-h-screen'>
            <div className='mt-16 flex justify-center space-x-10'>
                <h1 className='text-xl text-center'>Users list</h1>

                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="flex justify-end">
                        <input type="search" id="default-search" className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users" required />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </div>
            <div className="mt-10">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Paid User
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mail address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Change account details
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Disable from logging in
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                { console.log(user) }
                                return <tr className="bg-white dark:bg-gray-800 text-lg" key={user.email}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isProUser ? "Yes" : "No"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.mailAddress}
                                    </td>
                                    <td className="px-6 py-4">
                                        Change account details
                                    </td>
                                    <td className="px-6 py-4">
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input onClick={handleDisable} type="checkbox" value="" class="sr-only peer"/>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
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
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let usersList = await User.find();
    return {
        props: { users: JSON.parse(JSON.stringify(usersList)) }
    }
}

export default mnusers