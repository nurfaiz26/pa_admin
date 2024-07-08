import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import Cookies from "js-cookie"

const UsersForm = () => {
    let { IdData } = useParams()
    const token = Cookies.get('token') 
    const [input, setInput] = useState(
        {
            name: "",
            role: "",
            email: "",
            username: "",
            password: "",
            repassword: ""
        }
    )
    const [loading, setLoading] = useState(true)
    const [isPasswordRight, setIsPasswordRight] = useState(true)
    const [error, setError] = useState(null)
    const { baseUrl, navigate } = useContext(MainContext)

    useEffect(() => {
        function fetctData() {
            axios.get(`${baseUrl}/users/${IdData}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((res) => {
                let data = res.data.data[0]
                setInput(
                    {
                        name: data.name,
                        role: data.role,
                        email: data.email,
                        username: data.username
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

    }, [baseUrl, setInput, IdData, token])

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === "name") {
            setInput({ ...input, name: value })
        } else if (name === "role") {
            setInput({ ...input, role: value })
        } else if (name === "email") {
            setInput({ ...input, email: value })
        } else if (name === "username") {
            setInput({ ...input, username: value })
        } else if (name === "password") {
            setInput({ ...input, password: value })
        } else if (name === "repassword") {
            setInput({ ...input, repassword: value })
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let {
            name,
            role,
            email,
            username,
            password,
            repassword
        } = input

        if(role === undefined || role === "") {
            setError("Role empty")
            setIsPasswordRight(false)
        } 

        if (password === repassword) {
            if (IdData === undefined) {
                if(password === undefined || password !== "") {
                    if(role === undefined || role === "") {
                        setError("Role empty")
                        setIsPasswordRight(false)
                    }  else {
                        setIsPasswordRight(true)
                        axios.post(`${baseUrl}/users`, { name, role, email, username, password }, {
                            headers: {
                                "Authorization": "Bearer " + token
                            }
                        })
                        .then((res) => {
                            navigate("/users")
                            window.location.reload()
                        })
                    }
                } else {
                    setError("Password is empty")
                    setIsPasswordRight(false)
                }
            } else {
                if(password === undefined || password === "") {
                    setIsPasswordRight(true)
                    axios.patch(`${baseUrl}/users/${IdData}`, { name, role, email, username }, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                    .then((res) => {
                        navigate(`/users/${IdData}`)
                        alert('Data updated!')
                        window.location.reload()
                    })
                } else {
                    setIsPasswordRight(true)
                    axios.patch(`${baseUrl}/users/${IdData}`, { name, role, email, username, password }, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                        .then((res) => {
                            navigate(`/users/${IdData}`)
                            window.location.reload()
                        })
                }
            }
        } else {
            setError("Password is not match")
            setIsPasswordRight(false)
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
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                                <p className="text-secondary">User Form</p>
                            </Link>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        onChange={handleChange}
                                        value={input.username !== "" ? input.name : null}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={handleChange}
                                    >
                                        <option value={input.role !== "" ? input.role : null} selected>{input.role !== "" ? input.role : "--Select Role--"}</option>
                                        <option value={"Doctor"}>Doctor</option>
                                        <option value={"Expert"}>Expert</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="email@mail.com"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}
                                        value={input.email !== "" ? input.email : null}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}
                                        value={input.username !== "" ? input.username : ""}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="repassword"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Re-Input Password
                                    </label>
                                    <input
                                        type="password"
                                        name="repassword"
                                        id="repassword"
                                        placeholder="Re-Input Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                {!isPasswordRight &&
                                    <>
                                        <p className="text-red-700 font-medium">{error}</p>
                                    </>
                                }
                                <button type={"submit"} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersForm