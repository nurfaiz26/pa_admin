import React, { useState, useContext } from "react";
import Cookies from "js-cookie"
import axios from "axios";
import { GlobalContext } from '../context/GlobalContext';

const Login = () => {
    const { navigate } = useContext(GlobalContext)

    const [input, setInput] = useState({
        username : "",
        password : ""
    })

    const handleChange = (event) => {
        
        let value = event.target.value
        let name = event.target.name

        setInput({...input, [name] : value})
    }

    const handleLogin = (event) => {
        event.preventDefault()

        let {username, password} = input

        axios.post(`http://localhost:4000/login`, {username, password})
        .then((res) => {
            let {token} = res.data
            Cookies.set('token', token)
            navigate('/')
        })
    }

    return (
        <>
            <form onSubmit={handleLogin} >
                <label>USername</label>
                <input onChange={handleChange} value={input.email} type={'text'} name="username" /><br />
                <label>password</label>
                <input onChange={handleChange} value={input.password} type={'password'} name="password" /><br />

                <input type={'submit'} />

            </form>
        </>
    )
}

export default Login