import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    useEffect(() => {

        if (fetchStatus === true) {

            axios.get(`${baseUrl}/users`).then((res) => {
                setDataUsers([...res.data.data])
            }).catch((error) => {
                console.log(error)
            })
            
            axios.get(`${baseUrl}/class-results`).then((res) => {
                setDataClassifications([...res.data.data])
            }).catch((error) => {
                console.log(error)
            })
            
            axios.get(`${baseUrl}/patients`).then((res) => {
                setDataPatients([...res.data.data])
            }).catch((error) => {
                console.log(error)
            })

            setFetchStatus(false)
        }


    }, [fetchStatus, setFetchStatus])


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
                setDataClassifications
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}