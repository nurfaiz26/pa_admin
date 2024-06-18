import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Main = () => {

    const { word, number, data, handleDelete, handleEdit } = useContext(GlobalContext)

    return (
        <>
            <p>{word}</p>
            <p>{number}</p>

            {data != null && data.map((res) => {
                return (
                    <>
                        <li>
                            {res.patientName} | &nbsp;
                            <button onClick={handleEdit} value={res.patientId}>Edit</button>
                            <button onClick={handleDelete} value={res.patientId}>Delete</button>
                        </li>
                    </>
                )
            })}
        </>
    )
}

export default Main