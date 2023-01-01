import React, { useState, useRef } from "react";
import "./EntryTemplate.css";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import Popup from "../Popup/Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../Modals/Error/ErrorModal";
import RequestService from "../../services/RequestService";
const EntryTemplate = (props) => {
  const [openPopup, setOpenPopup] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const [error, setError] = useState();

  const ref = useRef();

  let userid = localStorage.getItem("userId");
  const [userid2, setUserId2] = useState(0);
  const [entryValues, setEntryValues] = useState({
    userid: userid,
    titlename: props.title,
    content: "",
  });

  const [booleanCheck, setBooleanCheck] = useState(false);

  const [liked, setLiked] = useState(false);

  const confirm = () => {
    setError(null);
  };

  const getUserInfo = async (e) => {
    e.preventDefault();
    await RequestService.get("api/User/" + props.user)
      .then((res) => {
        setUserId2(res.data.userid);

        console.log(parseInt(userid));
        console.log(parseInt(userid2));

        if (parseInt(userid) === parseInt(userid2)) {
          setBooleanCheck(true);
        } else {
          setBooleanCheck(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenProfile(!openProfile);
  };

  const Follow = (e) => {
    setOpenProfile(!openProfile);
    e.preventDefault();
    RequestService.post(
      "api/User/follow",
      {
        follower: userid,
        followed: userid2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        
       

        if (res.status === 200) {
          setTimeout(() => {});
          setError({
            title: "Işlem başarılı",
            message: "Bu kişiyi takip ettiniz!",
          });
        }
      })
      .catch((err) => {
        setError({
          title: "Başarısız işlem",
          message: "Zaten takip ediyorsun ",
        });
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
      setError({
        title: "Geçersiz değer",
        message: "Entry boş olamaz, lütfen entry giriniz !",
      });
      return;
    }

    RequestService.post("api/entry/", entryValues, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        

        if (res.status === 200) {
          setError({
            title: "İşlem başarılı",
            message: "Entry'ni girdin :)",
          });
          setOpenPopup(false);
        } else {
          setError({
            title: "İşlem başarısız",
            message: "Entry girilemedi be kanks :(",
          });
          setOpenPopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setError({
            title: "İşlem başarısız",
            message: "giriş yapılmadı galiba :(",
          });
        }
      });
  };

  const postLikeEntry = (e, entryid) => {
    console.log(e);
    console.log(entryid);
    e.preventDefault();
    RequestService.post(
      "api/entry/like",
      {
        likedentryid: entryid,
        userid: userid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        
        if (res.status === 200) {
          setError({
            title: "İşlem başarılı",
            message: "Beğenmenize sevindik :)",
          });

          setLiked(props.liked)
          
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setError({
            title: "İşlem başarısız",
            message: "giriş yapılmadı galiba :(",
          });
        }
      });
  };

  const postDislikeEntry = (e, entryid) => {
    e.preventDefault();
    RequestService.post(
      "api/entry/dislike",
      {
        dislikedentryid: entryid,
        userid: userid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        
        if (res.status === 200) {
          if (res.status === 200) {
            setError({
              title: "Başarılı işlem",
              message: "Entry Beğenilemedi",
            });
            return;
          }
        }
      })
      .catch((err) => {
        setError({
          title: "Başarısız işlem",
          message: "giriş yapılmadı galiba :("
        })
      });
  };

  const deleteEntry = (e) => {
    e.preventDefault();


    RequestService.delete("api/entry/delete/" + props.entryid,  {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
        Authorization: "Bearer " + token,
      },
    }).then(
      res => {
        

        if(res.status === 200){
          setError({
            title: "Işlem başarılı",
            message: "Entry silindi!"
          });
          setTimeout(() => {

            window.location.reload();
          }, 1000)
         
        }
      }
    ).catch(
      err => {
        setError({
          title: "Başarısız İşlem",
          message: "giriş yapılmadı galiba"
        })
      }
    )
  }
  return (
    <div className="entry">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          confirm={confirm}
        />
      )}
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
        {props.delete ? 
         <i className="deleteButton">
         {" "}
         <BsTrashFill onClick={deleteEntry} />
       </i> : null
        }
       
      </div>

      <div className="entryCaption">
        <p>{props.caption}</p>
      </div>

      <div className="entryFooter">
        <div className="entryLikeDislike">
          <p
            className="entryLike"
            onClick={(e) => postLikeEntry(e, props.entryid)}
          >
            <FaArrowUp /> {props.likes}
          </p>
          <p
            className="entryDislike"
            onClick={(e) => postDislikeEntry(e, props.entryid)}
          >
            <FaArrowDown />
            {props.dislikes}
          </p>
        </div>

        {error && (
          <ErrorModal
            confirm={confirm}
            title={error.title}
            message={error.message}
          />
        )}

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
              <div className="buttons">
                <button
                  className="closeModal"
                  onClick={() => setOpenPopup(false)}
                >
                  Vazgeçtim
                </button>
                <button className="enterYourEntry" onClick={handleEntryPost}>
                  Entry gir
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default EntryTemplate;
