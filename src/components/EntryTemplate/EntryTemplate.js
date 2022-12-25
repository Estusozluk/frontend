import React, { useState, useRef } from "react";
import "./EntryTemplate.css";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import Popup from "../Popup/Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
const EntryTemplate = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [error, setError] = useState();

  const ref = useRef();

  let userid = localStorage.getItem("userId");
  const [entryValues, setEntryValues] = useState({
    userid: userid,
    titlename: props.title,
    content: "",
  });

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const handleEntryValues = (e) => {
    const { name, value } = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value,
    });
  };

  const confirm = () => {
    setError(null);
  };

  const handleEntryPost = (e) => {
    e.preventDefault();

    if (ref.current.value.trim().length <= 0) {
      setError({
        title: "Geçersiz değer",
        message: "Entry boş olamaz, lütfen entry giriniz !",
      });
      //alert("Entry boş olamaz, lütfen entry giriniz!");
    }

    axios
      .post("https://localhost:5000/api/entry/", entryValues, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setError({
            title: "İşlem başarılı",
            message: "Entry'ni girdin :)",
          });

          //alert("Entry'niz başarıyla iletildi!");
          setOpenPopup(false);
        } else {
          setError({
            title: "İşlem başarısız",
            message: "Entry girilemedi be kanks :(",
          });
          //alert("Entry girilemedi, lutfen tekrar deneyiniz!");
          setOpenPopup(false);
        }
      })
      .err((err) => {
        console.log(err);
      });
  };
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
          <p className="entryLike">
            <FaArrowUp />
          </p>
          <p className="entryDislike">
            <FaArrowDown />
          </p>
        </div>

        <div className="entryUserInfo">
          <span className="entryUserName">{props.user}</span>
          <span className="entryEditDate">{props.date}</span>
        </div>
      </div>
      {error && (
        <ErrorModal
          confirm={confirm}
          title={error.title}
          message={error.message}
        />
      )}
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
