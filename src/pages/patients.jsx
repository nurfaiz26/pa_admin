import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import Cookies from "js-cookie"
import Search from "../components/search";

const Patients = () => {
    const { dataPatients, baseUrl, navigate, setCurrentId, search } = useContext(MainContext)
    const token = Cookies.get('token')

    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)
        console.log(token)
        axios.delete(`${baseUrl}/patients/${idData}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            window.location.reload()
        })
    }

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)

        setCurrentId(idData)

        navigate(`/patients/${idData}`)
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="relative overflow-x-auto">
                    <p className="font-bold text-xl ms-3">Patients</p>
                    <div className="grid lg:grid-cols-3 m-2">
                        <div className="lg:col-span-2">
                            <Search for={'Patient'} />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left my-3 rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPatients !== null && dataPatients.map((res) => {
                                if(String(search) === '') {
                                    return (
                                        <>
                                            <tr className="bg-primary border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {res.patientId}
                                                </th>
                                                <td className="px-6 py-4 text-black">{res.patientName}</td>
                                                <td className="px-6 py-4 flex items-center mt-5">
                                                    <button
                                                        onClick={handleEdit}
                                                        value={res.patientId}
                                                        className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-orange-500 font-bold"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={handleDelete} 
                                                        value={res.patientId}
                                                        className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-red-700 font-bold"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                } else {
                                    if(String(search) === String(res.patientId)) {
                                        return (
                                            <>
                                                <tr className="bg-primary border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {res.patientId}
                                                    </th>
                                                    <td className="px-6 py-4 text-black">{res.patientName}</td>
                                                    <td className="px-6 py-4 flex items-center mt-5">
                                                        <button
                                                            onClick={handleEdit}
                                                            value={res.patientId}
                                                            className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-orange-500 font-bold"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={handleDelete} 
                                                            value={res.patientId}
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

export default Patients