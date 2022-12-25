import React, { useState, useRef } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import RequestService from "../../services/RequestService";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import { useReducer } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const [searchArray, setSearchArray] = useState([]);

  const [openPopup, setOpenPopup] = useState(false)

  const userid = localStorage.getItem('userid')
  const token = localStorage.getItem('token')

  let [searchTitle, setSearchTitle] = useState("")

  let title = ""

  const [entryValues, setEntryValues] = useState({
  
    userid: userid,
    titlename: searchTitle,
    content: ''

    



    
  })

  const ref = useRef()



  const navigate = useNavigate();

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleEntryValues = e => {


    const {name, value} = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value
    })

  }
  
  function createNewTitle(entry){

    setOpenPopup(!openPopup);
    setSearchTitle(entry);
  }

  const handleEntryPost = (e, entry) => {
    e.preventDefault();

    if(ref.current.value.trim().length <= 0){
      alert("Entry boş olamaz, lütfen entry giriniz!")
    }

    RequestService.post('api/entry/', entryValues, {
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


  useEffect(() => {
    RequestService.get("api/title/titles?StartingWith=" + searchValue)
      .then((res) => {
        console.log(res.data);
        setSearchArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchValue]);
  return (
    <div className="searchBar">
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
          <div className="dataItem" onClick={() => createNewTitle(searchValue) }>Yeni başlık olustur: {searchValue}</div>

        </div>
      ) : null}


       <Popup trigger={openPopup} title={searchTitle}>
        <div className="modal">
          <div className="overlay">
            <div className="modalContent">
              <h2>{searchTitle}</h2>
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

export default SearchBar;
