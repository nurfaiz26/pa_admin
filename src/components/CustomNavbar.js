import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from '../context/GlobalContext';

const CustomNavbar = () => {
    const { navigate } = useContext(GlobalContext)

    return(
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/main'>Main</Link></li>
                <li><Link to='/create'>Create</Link></li>
                {!Cookies.get('token') && <li><Link to={'/login'}>Login</Link></li>}
                {Cookies.get('token') && <li><span onClick={() => {
                    Cookies.remove('token')
                    navigate('/login')
                }}>Logout</span></li>}
            </ul>
        </div>
    )
}

export default CustomNavbar