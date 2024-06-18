import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GlobalContext = createContext()

export const GlobalProvider = (props) => {
    let navigate = useNavigate()

    const [word, setWord] = useState('state 1')

    const [number, setNumber] = useState('state 2')

    const url = "http://127.0.0.1:4000/patients"

    const [data, setData] = useState(null)

    const [fetchStatus, setFetchStatus] = useState(true)

    const [currentId, setCurrentId] = useState(-1)

    useEffect(() => {

        if (fetchStatus === true) {

            axios.get(url)
                .then((res) => {
                    setData([...res.data.data])
                })
                .catch((error) => {

                })

            setFetchStatus(false)
        }


    }, [fetchStatus, setFetchStatus])

    console.log(data)

    const [input, setInput] = useState(
        {
            patientName: "",
        }
    )

    const handleInput = (event) => {

        let name = event.target.name
        let value = event.target.value

        if (name === "name") {
            setInput({ ...input, patientName: value })
        }
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        let {
            patientName
        } = input

        if (currentId === -1) {

            //create data
            axios.post(url, { patientName })
                .then((res) => {
                    console.log(res)
                    setFetchStatus(true)
                    navigate("/main")
                })

        } else {

            axios.patch(`${url}/${currentId}`, { patientName })
                .then((res) => {
                    setFetchStatus(true)
                    navigate("/main")
                })

        }

        setCurrentId(-1)


        setInput(
            {
                patientName: ""
            }
        )

    }

    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)
        console.log("id: " + idData)
        axios.delete(`${url}/${idData}`).then((res) => {
            setFetchStatus(true)
        })
    }

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)

        setCurrentId(idData)

        navigate(`/edit/${idData}`)

        // axios.get(`${url}/${idData}`)
        //     .then((res) => {
        //         let data = res.data.data[0]

        //         console.log(data.patientName)

        //         setInput(
        //             {
        //                 patientName: data.patientName
        //             }
        //         )

        //     })

    }

    return (
        <GlobalContext.Provider value={
            {
                word,
                setWord,
                number,
                setNumber,
                navigate,
                handleDelete,
                handleEdit,
                handleInput,
                handleSubmit,
                input,
                setInput,
                data,
                setData,
                url
            }
        }>
            {props.children}
        </GlobalContext.Provider>
    )
}