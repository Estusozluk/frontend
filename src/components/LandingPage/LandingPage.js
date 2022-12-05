import React, { useEffect, useState } from 'react'
import EntryTemplate from '../EntryTemplate/EntryTemplate'
import './LandingPage.css'
import RequestService from '../../services/RequestService'



const LandingPage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        RequestService.get("/api/entry/landing")
            .then(res => {
                    console.log(res.data);
                    setData(res.data)
                }
            )
    }, []);


    return (
        <div className='entries'>
            {data.map(entry => {
                return <EntryTemplate title={entry.value.titleData.titlename} caption={entry.value.titleData.content} />
            })}
        </div>
    )
}

export default LandingPage