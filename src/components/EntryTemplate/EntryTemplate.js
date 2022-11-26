import React, {useState} from 'react'
import './EntryTemplate.css'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import {IoMdAddCircle} from 'react-icons/io'
import Popup from '../Popup/Popup';
const EntryTemplate = (props) => {

  const [openPopup, setOpenPopup] = useState(false)
  return (

    
    <div className='entry'>
      <div className='entryTitle'>
        <h2>{props.title}</h2>

      </div>

      <div className='entryCaption'>
        <p>{props.caption}</p>
      </div>

      <div className='entryFooter'>
        <div className='entryLikeDislike'>
            <p className='entryLike'><FaArrowUp /></p>
            <p className='entryDislike'><FaArrowDown /></p>
            <p className='enterEntry' onClick={() => setOpenPopup(true)}><IoMdAddCircle /></p>
        </div>

        <div className='entryUserInfo'>
            <span className='entryUserName'>{props.user}</span>
            <span className='entryEditDate'>{props.date}</span>
        </div>
      </div>
      <Popup trigger= {openPopup} title={props.title}></Popup>
    </div>
  )
}

export default EntryTemplate
