import React, {useState, useRef} from 'react'
import './EntryTemplate.css'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import {IoMdAddCircle} from 'react-icons/io'
import Popup from '../Popup/Popup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EntryTemplate = (props) => {

  const [openPopup, setOpenPopup] = useState(false)

  const [openProfile, setOpenProfile] = useState(false)

  const ref = useRef()

  let userid = localStorage.getItem('userId')
  let userid2 = 0
  const [entryValues, setEntryValues] = useState({

    userid: userid,
    titlename: props.title,
    content: ''

    



    
  })

  const [followValues, setFollowValues] = useState({

    follower: userid,
    followed: localStorage.getItem("userid2")
  })


  const getUserInfo = async (e) => {
   
    e.preventDefault()

    await axios.get("https://localhost:5001/api/User/" + props.user)
    .then(
      res => {
        
        localStorage.setItem("userid2", res.data.userid)

       userid2 = res.data.userid
       console.log(userid)
       console.log(userid2)
       
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
    setOpenProfile(true)
  }

  const Follow = e => {
    e.preventDefault()
    axios.post("https://localhost:5001/api/User/follow", followValues)
    .then(
      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

  const navigate = useNavigate()

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

    
    <div className='entry'>
      <div className='entryTitle'>
        <div className='entryTitleContainer'>
        <h2 onClick={() => navigate('/titlePage', {state: {title: props.title}})}>{props.title}</h2>
        <p className='enterEntry' onClick={() => setOpenPopup(!openPopup)}><IoMdAddCircle /></p>
        </div>
        

      </div>

      <div className='entryCaption'>
        <p>{props.caption}</p>
      </div>

      <div className='entryFooter'>
        <div className='entryLikeDislike'>
            <p className='entryLike'><FaArrowUp /> {props.likes}</p>
            <p className='entryDislike'><FaArrowDown />{props.dislikes}</p>
       
        </div>

        <div className='entryUserInfo'>
            <span className='entryUserName' onClick={getUserInfo}>{props.user}</span>
            <span className='entryEditDate'>{props.date}</span>
        </div>
      </div>

      <Popup trigger={openProfile}>

        <div className='modal'>
          <div className='overlay'>
            <div className='modalContent'>
              <h2>{props.user}</h2>
              {userid === localStorage.getItem("userid2")
              ? <p>kendi kendini takip edemesin, sacmalama !!!!</p>
              :   <button onClick={Follow}>Takip et!</button>
              
            }
            
            </div>
          </div>
        </div>

      </Popup>

      <Popup trigger={openPopup} title={props.title}>

      <div className='modal'>

<div className='overlay'>
    <div className='modalContent'>
        <h2>{props.title}</h2>
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

export default EntryTemplate
