import React, { useState, useRef } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import RequestService from "../../services/RequestService";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import { useReducer } from "react";
import ErrorModal from "../Modals/Error/ErrorModal";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const [searchArray, setSearchArray] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const [error, setError] = useState();

  const userid = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [entryValues, setEntryValues] = useState({
    userid: userid,
    titlename: searchValue,
    content: "",
  });

  const ref = useRef();

  const navigate = useNavigate();

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const confirm = () => {
    setError(null);
  };

  const handleEntryValues = (e) => {
    const { name, value } = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value,
    });
  };

  function createNewTitle(entry) {
    setOpenPopup(!openPopup);
    setSearchValue(entry);
  }

  const handleEntryPost = async (e) => {
    e.preventDefault();

    if (ref.current.value.trim().length <= 0) {
      setError({
        title: "Başarısız işlem",
        message: "Entry boş olamaz, lütfen entry giriniz",
      });
      setOpenPopup(!openPopup);
      return;
    }

    await RequestService.post(
      "api/entry/",
      {
        userid: userid,
        titlename: searchValue,
        content: entryValues.content,
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
            title: "Başarılı işlem",
            message: "Entry'niz başarıyla iletildi",
          });

          setOpenPopup(false);
          return;
        } else {
          setError({
            title: "Başarısız işlem",
            message: "Entry girilemedi, lütfen tekrar deneyiniz!",
          });
          setOpenPopup(false);
          return;
        }
      })
      .err((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchValue == "" || !searchValue) {
      setSearchArray([]);
      return;
    }
    RequestService.get("api/title/titles?StartingWith=" + searchValue)
      .then((res) => {
        setSearchArray(res.data);
      })
      .catch((err) => {});
  }, [searchValue]);
  return (
    <div className="searchBar">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          confirm={confirm}
        />
      )}
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Başlık girin"
          name="searchValue"
          onChange={handleSearchValue}
        />
        <div className="searchIcon">
          <FaSearch />
        </div>
      </div>
      {searchValue != "" ? (
        <div className="dataResult">
          <div className="dataItem" onClick={() => createNewTitle(searchValue)}>
            Yeni başlık olustur: {searchValue}
          </div>
          {searchArray.map((obj) => {
            return (
              <div
                onClick={() =>
                  navigate("/titlePage", { state: { title: obj } })
                }
              >
                {obj}
              </div>
            );
          })}
          {}
        </div>
      ) : null}

      <Popup trigger={openPopup} title={searchValue}>
        <div className="modal">
          <div className="overlay">
            <div className="modalContent">
              <h2>{searchValue}</h2>
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
                  Close
                </button>
                <button className="enterYourEntry" onClick={handleEntryPost}>
                  entry gir
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default SearchBar;
