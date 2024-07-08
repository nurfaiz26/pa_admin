import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import Cookies from "js-cookie"
import Search from "../components/search";

const Users = () => {
    const { dataUsers, setCurrentId, navigate, baseUrl, search } = useContext(MainContext)
    const token = Cookies.get('token')

    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)
        axios.delete(`${baseUrl}/users/${idData}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        window.location.reload()
    }

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)

        setCurrentId(idData)

        navigate(`/users/${idData}`)
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="relative overflow-x-auto">
                    <p className="font-bold text-xl ms-3">Users</p>
                    <div className="grid lg:grid-cols-3 m-2">
                        <div className="lg:col-span-2">
                            <Search for={'User'} />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left my-3 rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    UserId
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUsers !== null && dataUsers.map((res) => {
                                if(String(search) === '') {
                                    return (
                                        <>
                                            <tr className="bg-primary border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {res.userId}
                                                </th>
                                                <td className="px-6 py-4 text-black">{res.name}</td>
                                                <td className="px-6 py-4 text-black">{res.role}</td>
                                                <td className="px-6 py-4 text-black">{res.username}</td>
                                                <td className="px-6 py-4 text-black">{res.email}</td>
                                                <td className="px-6 py-4 flex items-center">
                                                <button
                                                        onClick={handleEdit}
                                                        value={res.userId}
                                                        className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-orange-500 font-bold"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={handleDelete} 
                                                        value={res.userId}
                                                        className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-red-700 font-bold"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                } else {
                                    if(String(search) === String(res.userId)){
                                        return (
                                            <>
                                                <tr className="bg-primary border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {res.userId}
                                                    </th>
                                                    <td className="px-6 py-4 text-black">{res.name}</td>
                                                    <td className="px-6 py-4 text-black">{res.role}</td>
                                                    <td className="px-6 py-4 text-black">{res.username}</td>
                                                    <td className="px-6 py-4 text-black">{res.email}</td>
                                                    <td className="px-6 py-4 flex items-center">
                                                    <button
                                                            onClick={handleEdit}
                                                            value={res.userId}
                                                            className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-orange-500 font-bold"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={handleDelete} 
                                                            value={res.userId}
                                                            className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-red-700 font-bold"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    } else {
                                        return(
                                            <>
                                            </>
                                        )
                                    }
                                }
                                
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users