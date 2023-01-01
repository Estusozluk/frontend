import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import RequestService from "../../services/RequestService";
import TitlePageTemplate from "../TitlePageTemplate/TitlePageTemplate";
import { IoMdAddCircle } from "react-icons/io";
import Popup from "../Popup/Popup";
import ErrorModal from "../Modals/Error/ErrorModal";

const TitlePage = () => {
  const [entryArray, setEntryArray] = useState([]);
  const userid = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const location = useLocation();
  const { title } = location.state;
  console.log(title);

  const [openPopup, setOpenPopup] = useState(false);

  const [error, setError] = useState();

  const confirm = (e) => {
    setError(null);
  };

  const ref = useRef();

  const handleEntryValues = (e) => {
    const { name, value } = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value,
    });
  };

  function checkUserLoggedIn() {
    console.log(token);
    if (token === null) {
      setError({
        title: "Başarısız işlem",
        message: "E hani giriş yapmamışsın ki",
      });
      //alert("Giriş yapar mısın canım :))");
      return;
    } else {
      setOpenPopup(!openPopup);
    }
  }

  const [entryValues, setEntryValues] = useState({
    userid: userid,
    titlename: title,
    content: "",
  });

  const handleEntryPost = (e) => {
    e.preventDefault();
    console.log(title);

    if (ref.current.value.trim().length <= 0) {
      setError({
        title: "Işlem başarısız",
        message: "Entry boş olamaz",
      });
      setOpenPopup(!openPopup);
      return;
    }

    RequestService.post(
      "api/entry/",
      {
        userid: userid,
        titlename: title,
        content: entryValues.content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setError({
            title: "Başarılı işlem",
            message: "Entry başarıyla iletildi!",
          });
          setOpenPopup(false);
          return;
        } else {
          setError({
            title: "Başarısız işlem",
            message: "Entry girilemedi, lütfen tekrar deneyiniz",
          });
          setOpenPopup(false);
          return;
        }
      })
      .err((err) => {
        if (err.response.status === 401) {
        }
      });
  };

  useEffect(() => {
    RequestService.get("api/title/" + title)
      .then((res) => {
        console.log(res.data);
        setEntryArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [title]);

  return (
    <div className="titlePage">
      <div className="titlePageTitle">
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            confirm={confirm}
          />
        )}

        <div className="titlePageTitleContainer">
          <h2>{title}</h2>
          <p className="enterEntry" onClick={checkUserLoggedIn}>
            <IoMdAddCircle /> Entry Giriniz
          </p>
        </div>
      </div>

      <div>
        {entryArray.map((entry) => {
          return (
            <TitlePageTemplate
              entryid={entry.entry.entryid}
              content={entry.entry.content}
              user={entry.user}
              writedate={entry.entry.writedate}
              likeCount={entry.likeCount}
              dislikeCount={entry.disLikeCount}
            />
          );
        })}

        <Popup trigger={openPopup} title={title}>
          <div className="modal">
            <div className="overlay">
              <div className="modalContent">
                <h2>{title}</h2>
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
    </div>
  );
};

export default TitlePage;
