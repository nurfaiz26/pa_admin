import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { MainContext } from "../context/MainContext";

const Dashboard = () => {
    const { dataUsers, dataClassifications } = useContext(MainContext)

    let expertCount = 0
    let doctorCount = 0
    let epiduralCount = 0
    let subduralCount = 0
    let subarachnoidCount = 0
    let intraparenchymalCount = 0
    let intraventicularCount = 0
    let normalCount = 0

    if (dataUsers !== null && dataClassifications !== null) {
        dataUsers.map((res) => {
            if (res.role === "Expert") {
                expertCount += 1
            }
            else if (res.role === "Doctor") {
                doctorCount += 1
            }
            return res
        })

        dataClassifications.map((res) => {
            if (res.classification === "Normal") {
                normalCount += 1
            }
            else if (res.classification === "Subdural") {
                subduralCount += 1
            }
            else if (res.classification === "Epidural") {
                epiduralCount += 1
            }
            else if (res.classification === "Intraventicular") {
                intraventicularCount += 1
            }
            else if (res.classification === "Intraparenchymal") {
                intraparenchymalCount += 1
            }
            else if (res.classification === "Subarachnoid") {
                subarachnoidCount += 1
            }
            return res
        })
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 dark:border-gray-700">
                    <div className="max-w-sm p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to={"/users"}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Jumlah User
                            </h5>
                        </Link>
                        <ul className="max-w-md mb-2 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            <li>
                                User Doctor: {doctorCount} Users
                            </li>
                            <li>
                                User Expert: {expertCount} Users
                            </li>
                        </ul>
                        <Link
                            to={"/users"}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondary rounded-lg hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            See Users
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className="max-w-sm p-6 mt-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to={"/classifications"}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Jumlah Classifications
                            </h5>
                        </Link>
                        <ul className="max-w-md mb-2 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            <li>
                                Epidural: {epiduralCount} Results
                            </li>
                            <li>
                                Subdural: {subduralCount} Results
                            </li>
                            <li>
                                Subarachnoid: {subarachnoidCount} Results
                            </li>
                            <li>
                                Intraparenchymal: {intraparenchymalCount} Results
                            </li>
                            <li>
                                Intraventicular: {intraventicularCount} Results
                            </li>
                            <li>
                                Normal: {normalCount} Results
                            </li>
                        </ul>
                        <Link
                            to={"/classifications"}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondary rounded-lg hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            See Classifications
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard