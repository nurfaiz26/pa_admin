import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"

export const MainContext = createContext()

export const MainProvider = (props) => {
    // Online Server
    // const baseUrl = "https://api.ichwunden.my.id/admin"
    // Local Server
    const baseUrl = "http://localhost:4000/admin"
    let navigate = useNavigate()
    const [dataUsers, setDataUsers] = useState(null)
    const [dataClassifications, setDataClassifications] = useState(null)
    const [dataPatients, setDataPatients] = useState(null)
    const [fetchStatus, setFetchStatus] = useState(true)
    const [currentId, setCurrentId] = useState(-1)
    let token = Cookies.get('token')
    const [search, setSearch] = useState("")

    useEffect(() => {

        if (fetchStatus === true) {

            if (token !== undefined) {
                axios.get(`${baseUrl}/users`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then((res) => {
                    setDataUsers([...res.data.data])
                }).catch((error) => {
                    console.log(error)
                })

                axios.get(`${baseUrl}/class-results`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then((res) => {
                    setDataClassifications([...res.data.data])
                }).catch((error) => {
                    console.log(error)
                })

                axios.get(`${baseUrl}/patients`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then((res) => {
                    setDataPatients([...res.data.data])
                }).catch((error) => {
                    console.log(error)
                })
            }


            setFetchStatus(false)
        }


    }, [fetchStatus, setFetchStatus, token])

    const handleSearch = (event) => {
        setSearch("")
        setSearch(event.target.value)
    }


    return (
        <MainContext.Provider value={
            {
                baseUrl,
                navigate,
                dataUsers,
                setDataUsers,
                dataPatients,
                setDataPatients,
                fetchStatus,
                setFetchStatus,
                currentId,
                setCurrentId,
                dataClassifications,
                setDataClassifications,
                search,
                setSearch,
                handleSearch
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}