import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const { handleSubmit, handleInput, input, url, setInput } = useContext(GlobalContext)

    let { IdData } = useParams()

    useEffect(() => {
        console.log(`${url}/${IdData}`)
        if (IdData !== undefined) {
            axios.get(`${url}/${IdData}`)
                .then((res) => {
                    let data = res.data.data[0]

                    console.log(data.patientName)

                    setInput(
                        {
                            patientName: data.patientName
                        }
                    )

                })
        }
    }, [IdData, setInput, url])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Masukkan Nama:</p>
                    <input onChange={handleInput} value={input.patientName} type="text" name='name' required />
                    <br />
                    <input type={'submit'} />
                </form>
            </div>
        </>
    )
}

export default Create