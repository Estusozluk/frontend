import React, {useState} from 'react'
import './EntryTemplate.css'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import {IoMdAddCircle} from 'react-icons/io'
import Popup from '../Popup/Popup';
import axios from 'axios';
const EntryTemplate = (props) => {

  const [openPopup, setOpenPopup] = useState(false)

  let userid = localStorage.getItem('userId')
  const [entryValues, setEntryValues] = useState({

    userid: userid,
    titlename: props.title,
    content: ''

    



    
  })

  let token = localStorage.getItem('token')



  const handleEntryValues = e => {


    const {name, value} = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value
    })

  }



  const handleEntryPost = e => {
    e.preventDefault();


    axios.post('https://localhost:5001/api/entry/', entryValues, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
        'Authorization': 'Bearer '+ token
      }
    }).then(
      res => {
        console.log(res)

        if(res.status === 200){

          alert("Entry'niz başarıyla iletildi!")
          setOpenPopup(false)
        }
      }
    ).err(
      err => {
        console.log(err)
      }
    )
  }
  return (

    
    <div className='entry'>
      <div className='entryTitle'>
        <div className='entryTitleContainer'>
        <h2>{props.title}</h2>
        <p className='enterEntry' onClick={() => setOpenPopup(!openPopup)}><IoMdAddCircle /></p>
        </div>
        

      </div>

      <div className='entryCaption'>
        <p>{props.caption}</p>
      </div>

      <div className='entryFooter'>
        <div className='entryLikeDislike'>
            <p className='entryLike'><FaArrowUp /></p>
            <p className='entryDislike'><FaArrowDown /></p>
       
        </div>

        <div className='entryUserInfo'>
            <span className='entryUserName'>{props.user}</span>
            <span className='entryEditDate'>{props.date}</span>
        </div>
      </div>
      <Popup trigger={openPopup} title={props.title}>

      <div className='modal'>

<div className='overlay'>
    <div className='modalContent'>
        <h2>{props.title}</h2>
        <input type="text" placeholder='entry giriniz...' name='content' value={entryValues.content} onChange={handleEntryValues} className='captionEnter' />
        <button className='closeModal'  onClick={() => setOpenPopup(false)}>Close</button>
        <button className='enterYourEntry' onClick={handleEntryPost}>entry gir</button>
        
    </div>
    
</div>

</div>

      </Popup>
    </div>
  )
}

export default EntryTemplate
