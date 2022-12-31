
import React, {useEffect, useState, useRef} from 'react'

import './TitlePageTemplate.css'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa'
import {IoMdAddCircle} from 'react-icons/io'

import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import EntryTemplate from '../EntryTemplate/EntryTemplate';
import Popup from '../Popup/Popup';
import RequestService from '../../services/RequestService';

const TitlePageTemplate = (props) => {

    
    

    

    const [entryArray, setEntryArray] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const [openProfile, setOpenProfile] = useState(false);

    let userid = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    const [userid2, setUserId2] = useState(0);

    const [booleanCheck, setBooleanCheck] = useState(false)
    


    const [entryIsLiked, setEntryIsLiked] = useState(false);

    const [entryIsDisliked, setEntryIsDisliked] = useState(false);

    const [userToBeFollowed, setUserToBeFollowed] = useState("");

 
    const getUserInfo =  async (e, user) => {
      setUserToBeFollowed(user)
      e.preventDefault();
       await RequestService.get("api/User/" + user)
        .then((res) => {
         
  
          setUserId2(res.data.userid) 
  
          
  
          console.log(parseInt(userid))
          console.log(parseInt(userid2))
  
          if(parseInt(userid) === parseInt(userid2)){
  
            setBooleanCheck(true)
          }
          else{
            setBooleanCheck(false)
          }
         
         
        
        })
        .catch((err) => {
          console.log(err);
        });
      setOpenProfile(!openProfile);
    };

     const Follow = (e) => {
    e.preventDefault();
    RequestService
      .post("api/User/follow", {
        follower: userid,
        followed: userid2
      }, {

        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : 'http://localhost:3000/',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          'Authorization': 'Bearer '+ token
        }
        
      } )
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          alert("bu kişiyi artık takip ediyorsunuz")
        }
      })
      .catch((err) => {
        console.log(err);
       
      });
  };


 

   const postLikeEntry = (e, entryid) => {
    console.log(e)
    console.log(entryid)
    e.preventDefault();
    RequestService.post("api/entry/like", {
      likedentryid: entryid,
      userid: userid
    }, {
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
          setEntryIsLiked(!entryIsLiked)
          alert("beğenmene sevindik :))")
        }
      }
    ).catch(
      err => {
        console.log(err)
        if(err.response.status === 401){
          alert("giriş yapmadınız galiba ?!")
          
        }
      }
    )

   
   }

   const postDislikeEntry = (e, entryid) => {
    e.preventDefault();
    RequestService.post("api/entry/dislike", {
      dislikedentryid: entryid,
      userid: userid
    }, {
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
          alert("Entry beğenilmedi !!")
          setEntryIsDisliked(!entryIsDisliked)
        }
      }
    ).catch(
      err => {
        console.log(err)
        if(err.response.status === 401){
          alert("giriş yapmadınız galiba ?!")
          
        }
      }
    )
    
   }
    const ref = useRef()
    
 


    var entryMap = new Map()





  
  return (
    
    <div className='titlePage'>



        
             

               
              
            
                

                    <div className='entry'>
                    <div className='entryCaption'>
                    <p>{props.content}</p>
                  </div>
            
                  <div className='entryFooter'>
                    <div className='entryLikeDislike'>
                        <p className='entryLike' onClick={(e) => postLikeEntry(e, props.entryid)}><FaArrowUp /> {props.likeCount}</p>
                        <p className='entryDislike' onClick={(e) => postDislikeEntry(e, props.entryid) }><FaArrowDown />{props.dislikeCount}</p>
                   
                    </div>
            
                    <div className='entryUserInfo'>
                        <span className='entryUserName' onClick={(e) => getUserInfo(e, props.user)}>{props.user}</span>
                        <span className='entryEditDate'>{props.writedate}</span>
                    </div>
                  </div>
                    </div>


                
    

<Popup trigger={openProfile}>
        <div className="modal">
          <div className="overlay">
            <div className="modalContent">
              <h2>{userToBeFollowed}</h2>
              {booleanCheck ? (
                <p>kendi kendini takip edemesin, sacmalama !!!!</p>
              ) : (
                <button onClick={Follow}>Takip et!</button>
              )}
            </div>
          </div>
        </div>
      </Popup>


    </div>
  )
}

export default TitlePageTemplate
