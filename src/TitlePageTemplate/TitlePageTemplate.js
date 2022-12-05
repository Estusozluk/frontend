import React, {useEffect, useState} from 'react'
import '../components/EntryTemplate/EntryTemplate.css'
import './TitlePageTemplate.css'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import RequestService from '../services/RequestService'

const TitlePageTemplate = (props) => {

    const location = useLocation();
    const {title} = location.state;

    const [entryArray, setEntryArray] = useState([])


    useEffect(() => {

        RequestService.get("/api/entry/" + title).then(
            res => {
                console.log(res)
                setEntryArray(res.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }, [title])
  return (
    
    <div className='titlePage'>

        <div className='title'>
            <h2>{title}</h2>
        </div>

        
             {entryArray.map(entry => {
                return (

                    <div className='entry'>
                    <div className='entryCaption'>
                    <p>{entry.content}</p>
                  </div>
            
                  <div className='entryFooter'>
                    <div className='entryLikeDislike'>
                        <p className='entryLike'><FaArrowUp /></p>
                        <p className='entryDislike'><FaArrowDown /></p>
                   
                    </div>
            
                    <div className='entryUserInfo'>
                        <span className='entryUserName'>{entry.user.username}</span>
                        <span className='entryEditDate'>{entry.writedate}</span>
                    </div>
                  </div>
                    </div>


                )
            })}
        


    </div>
  )
}

export default TitlePageTemplate
