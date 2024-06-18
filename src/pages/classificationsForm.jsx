import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import axios from "axios";

const ClassificationsForm = () => {
    let { IdData } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { baseUrl, navigate } = useContext(MainContext)
    const [input, setInput] = useState(
        {
            patientId: "",
            doctorId: "",
            date: "",
            ctscan: "",
            label: "",
            classification: "",
            probability: ""
        }
    )

    useEffect(() => {
        function fetctData() {
            axios.get(`${baseUrl}/class-results/${IdData}`).then((res) => {
                let data = res.data.data[0]
                setInput(
                    {
                        patientId: data.patientId,
                        doctorId: data.doctorId,
                        date: data.date,
                        ctscan: data.ctscan,
                        label: data.label,
                        classification: data.classification,
                        probability: data.probability
                    }
                )
                setLoading(false)
            }).catch((error) => {
                setError(error)
                setLoading(false)
            })
        }
        fetctData()

    }, [IdData, baseUrl])

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === "patientId") {
            setInput({ ...input, patientId: value })
        } else if (name === "doctorId") {
            setInput({ ...input, doctorId: value })
        } else if (name === "date") {
            setInput({ ...input, date: value })
        } else if (name === "imageUrl") {
            setInput({ ...input, ctscan: value })
        } else if (name === "label") {
            setInput({ ...input, label: value })
        } else if (name === "class") {
            setInput({ ...input, classification: value })
        } else if (name === "probability") {
            setInput({ ...input, probability: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let {
            patientId,
            doctorId,
            date,
            ctscan,
            label,
            classification,
            probability,
        } = input


        if (IdData !== undefined) {
            console.log(input)
            axios.patch(`${baseUrl}/class-results/${IdData}`, {patientId, doctorId, date, ctscan, label, classification, probability})
                .then((res) => {
                    navigate(`/classifications/${IdData}`)
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
                                <p className="text-secondary">Classification Form</p>
                            </Link>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="patientId"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Patient Id
                                    </label>
                                    <input
                                        type={"text"}
                                        name="patientId"
                                        id="patientId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Patient Id"
                                        onChange={handleChange}
                                        value={input.patientId}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="doctorId"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Doctor Id
                                    </label>
                                    <input
                                        type="text"
                                        name="doctorId"
                                        id="doctorId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Doctor Id"
                                        onChange={handleChange}
                                        value={input.doctorId}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="text"
                                        name="date"
                                        id="date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Date"
                                        onChange={handleChange}
                                        value={input.date}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="imageUrl"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Image Url
                                    </label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        id="imageUrl"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Image Url"
                                        onChange={handleChange}
                                        value={input.ctscan}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="label"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Label
                                    </label>
                                    <select
                                        id="label"
                                        name="label"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={handleChange}
                                    >
                                        <option value={input.label} selected>{input.label ? input.label : "--Masukkan Label--"}</option>
                                        <option value={"Subdural"}>Subdural</option>
                                        <option value={"Subarachnoid"}>Subarachnoid</option>
                                        <option value={"Intraparenchymal"}>Intraparenchymal</option>
                                        <option value={"Intraventicular"}>Intraventicular</option>
                                        <option value={"Epidural"}>Epidural</option>
                                        <option value={"Normal"}>Normal</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="class"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Class
                                    </label>
                                    <select
                                        id="class"
                                        name="class"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={handleChange}
                                    >
                                        <option value={input.classification} selected>{input.classification ? input.classification : "--Masukkan Classification--"}</option>
                                        <option value={"Subdural"}>Subdural</option>
                                        <option value={"Subarachnoid"}>Subarachnoid</option>
                                        <option value={"Intraparenchymal"}>Intraparenchymal</option>
                                        <option value={"Intraventicular"}>Intraventicular</option>
                                        <option value={"Epidural"}>Epidural</option>
                                        <option value={"Normal"}>Normal</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="probability"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Probability
                                    </label>
                                    <input
                                        type="text"
                                        name="probability"
                                        id="probability"
                                        placeholder="Probability"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}
                                        value={input.probability}
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

export default ClassificationsForm