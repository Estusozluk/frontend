import React, { useState, useRef } from "react";
import "./EntryTemplate.css";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import Popup from "../Popup/Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EntryTemplate = (props) => {
  const [openPopup, setOpenPopup] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const ref = useRef();

  let userid = localStorage.getItem("userId");
  let userid2 = 1;
  const [entryValues, setEntryValues] = useState({
    userid: userid,
    titlename: props.title,
    content: "",
  });

  const [booleanCheck, setBooleanCheck] = useState(false)
  

  const getUserInfo = async (e) => {
    e.preventDefault();
     await axios.get("https://localhost:5001/api/User/" + props.user)
      .then((res) => {
       

        userid2 = res.data.userid

        

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
    axios
      .post("https://localhost:5001/api/User/follow", {
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
        if(err.response.status === 401){

          alert("giriş yapmadınız galiba?!")
        }
      });
  };

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const handleEntryValues = (e) => {
    const { name, value } = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value,
    });
  };

  const handleEntryPost = (e) => {
    e.preventDefault();

    if (ref.current.value.trim().length <= 0) {
      alert("Entry boş olamaz, lütfen entry giriniz!");
    }

    axios
      .post("https://localhost:5001/api/entry/", entryValues, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : 'http://localhost:3000/',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          'Authorization': 'Bearer '+ token
        }
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          alert("Entry'niz başarıyla iletildi!");
          setOpenPopup(false);
        } else {
          alert("Entry girilemedi, lutfen tekrar deneyiniz!");
          setOpenPopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401){
          alert("giriş yapmadınız galiba")
        }
      });
  };

  const postLikeEntry = (e, entryid) => {
    console.log(e)
    console.log(entryid)
    e.preventDefault();
    axios.post("https://localhost:5001/api/entry/like", {
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
          if(res.status === 200){
            alert("beğenmene sevindik :))")
          }
        }
      
      }
    ).catch(
      err => {
        console.log(err)
        if(err.response.status === 401){
          alert("giriş yapmadınız galiba")
        }
      }
    )

   
   }

   const postDislikeEntry = (e, entryid) => {
    e.preventDefault();
    axios.post("https://localhost:5001/api/entry/dislike", {
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
          if(res.status === 200){
            alert("bu entry beğenilmedi")
          }
        }
       
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
    
   }
  return (
    <div className="entry">
      <div className="entryTitle">
        <div className="entryTitleContainer">
          <h2
            onClick={() =>
              navigate("/titlePage", { state: { title: props.title } })
            }
          >
            {props.title}
          </h2>
         
        </div>
      </div>

      <div className="entryCaption">
        <p>{props.caption}</p>
      </div>

      <div className="entryFooter">
        <div className="entryLikeDislike">
          <p className="entryLike" onClick={(e) => postLikeEntry(e, props.entryid)}>
            <FaArrowUp /> {props.likes}
          </p>
          <p className="entryDislike" onClick={(e) => postDislikeEntry(e, props.entryid)}>
            <FaArrowDown />
            {props.dislikes}
          </p>
        </div>

        <div className="entryUserInfo">
          <span className="entryUserName" onClick={getUserInfo}>
            {props.user}
          </span>
          <span className="entryEditDate">{props.date}</span>
        </div>
      </div>

      <Popup trigger={openProfile}>
        <div className="modal">
          <div className="overlay">
            <div className="modalContent">
              <h2>{props.user}</h2>
              {booleanCheck ? (
                <p>kendi kendini takip edemesin, sacmalama !!!!</p>
              ) : (
                <button onClick={Follow}>Takip et!</button>
              )}
            </div>
          </div>
        </div>
      </Popup>

      <Popup trigger={openPopup} title={props.title}>
        <div className="modal">
          <div className="overlay">
            <div className="modalContent">
              <h2>{props.title}</h2>
              <input
                type="text"
                placeholder="entry giriniz..."
                name="content"
                ref={ref}
                value={entryValues.content}
                onChange={handleEntryValues}
                className="captionEnter"
                required
              />
              <button
                className="closeModal"
                onClick={() => setOpenPopup(false)}
              >
                Close
              </button>
              <button className="enterYourEntry" onClick={handleEntryPost}>
                entry gir
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default EntryTemplate;
