
import React, {useEffect, useState, useRef} from 'react'
import '../components/EntryTemplate/EntryTemplate.css'
import './TitlePageTemplate.css'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import {IoMdAddCircle} from 'react-icons/io'

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import EntryTemplate from '../components/EntryTemplate/EntryTemplate';
import Popup from '../components/Popup/Popup';

const TitlePageTemplate = (props) => {

    const location = useLocation();
    const {title} = location.state;

    const [entryArray, setEntryArray] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    let userid = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    const [likedEntryValues, setLikedEntryValues] = useState({

      likedentryid: localStorage.getItem("entryid"),
      userid: userid
    })

    const [dislikedEntryValues, setDislikedEntryValues] = useState({
      dislikedentryid: localStorage.getItem("entryid"),
      userid: userid
    })

   const postLikeEntry = e => {
    e.preventDefault();
    axios.post("https://localhost:5001/api/entry/like", likedEntryValues).then(
      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )

   
   }

   const postDislikeEntry = e => {
    e.preventDefault();
    axios.post("https://localhost:5001/api/entry/dislike", dislikedEntryValues).then(
      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
    
   }
    const ref = useRef()
    const [entryValues, setEntryValues] = useState({
  
      userid: userid,
      titlename: title,
      content: ''
  
      
  
  
  
      
    })

 


    var entryMap = new Map()

    useEffect(() => {

        axios.get("https://localhost:5001/api/entry/" + title).then(
            res => {
                console.log(res)
                setEntryArray(res.data)
               
               
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }, [title, openPopup])


  const handleEntryValues = e => {


    const {name, value} = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value
    })

  }



  const handleEntryPost = e => {
    e.preventDefault();

    if(ref.current.value.trim().length <= 0){
      alert("Entry boş olamaz, lütfen entry giriniz!")
    }

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
        else{
          alert("Entry girilemedi, lutfen tekrar deneyiniz!")
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
    
    <div className='titlePage'>

<div className='titlePageTitle'>
        <div className='titlePageTitleContainer'>
        <h2>{title}</h2>
        <p className='enterEntry' onClick={() => setOpenPopup(!openPopup)}><IoMdAddCircle /></p>
        </div>
        

      </div>

        
             {entryArray.map((entry, index) => {

                entryMap.set(index, entry.entryid)
                console.log(entryMap)
            
                return (

                    <div className='entry'>
                    <div className='entryCaption'>
                    <p>{entry.e.content}</p>
                  </div>
            
                  <div className='entryFooter'>
                    <div className='entryLikeDislike'>
                        <p className='entryLike' onClick={() => {localStorage.setItem("entryid", entry.e.entryid); console.log(localStorage.getItem("entryid"))}}><FaArrowUp onClick={postLikeEntry} /></p>
                        <p className='entryDislike' onClick={() => {localStorage.removeItem("entryid"); localStorage.setItem("entryid", entry.e.entryid)}}><FaArrowDown onClick={postDislikeEntry} />{entry.dislikeCount}</p>
                   
                    </div>
            
                    <div className='entryUserInfo'>
                        <span className='entryUserName'>{entry.user}</span>
                        <span className='entryEditDate'>{entry.e.writedate}</span>
                    </div>
                  </div>
                    </div>


                )
            })}
        
        <Popup trigger={openPopup} title={title}>

<div className='modal'>

<div className='overlay'>
<div className='modalContent'>
  <h2>{title}</h2>
  <input type="text" placeholder='entry giriniz...' name='content' ref={ref} value={entryValues.content} onChange={handleEntryValues} className='captionEnter' required />
  <button className='closeModal'  onClick={() => setOpenPopup(false)}>Close</button>
  <button className='enterYourEntry' onClick={handleEntryPost}>entry gir</button>
  
</div>

</div>

</div>

</Popup>


    </div>
  )
}

export default TitlePageTemplate
