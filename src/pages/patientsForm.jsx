import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../context/MainContext";

const PatientsForm = () => {
    let { IdData } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { baseUrl, navigate } = useContext(MainContext)
    const [input, setInput] = useState(
        {
            patientName: ""
        }
    )

    useEffect(() => {
        function fetctData() {
            axios.get(`${baseUrl}/patients/${IdData}`).then((res) => {
                let data = res.data.data[0]
                setInput(
                    {
                        patientName: data.patientName
                    }
                )
                setLoading(false)
            }).catch((error) => {
                setError(error)
                setLoading(false)
            })
        }
        if (IdData) {
            fetctData()
        } else {
            setLoading(false)
        }


    }, [IdData, baseUrl])

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === "patientName") {
            setInput({ ...input, patientName: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let {
            patientName
        } = input


        if (IdData !== undefined) {
            axios.patch(`${baseUrl}/patients/${IdData}`, { patientName })
                .then((res) => {
                    navigate(`/patients/${IdData}`)
                    window.location.reload()
                })
        } else {
            axios.post(`${baseUrl}/patients`, { patientName })
                .then((res) => {
                    navigate(`/patients`)
                    window.location.reload()
                })
        }

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error)
    }


    return (
        <>

            <div className="p-4 sm:ml-64">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Link
                                to={"#"}
                                className="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                <img
                                    className="w-8 h-8 mr-2"
                                    src={require('../assets/images/app-logo.png')}
                                    alt="logo"
                                />
                                <p className="text-secondary">Patient Form</p>
                            </Link>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="patientName"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Patient Name
                                    </label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        id="patientName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Patient Name"
                                        onChange={handleChange}
                                        value={input.patientName}
                                        required
                                    />
                                </div>
                                <button type={"submit"} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientsForm