import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import RequestService from "../../services/RequestService";
import TitlePageTemplate from "../../TitlePageTemplate/TitlePageTemplate";
import { IoMdAddCircle } from "react-icons/io";
import Popup from "../Popup/Popup";
import ErrorModal from "../Modals/Error/ErrorModal";

const TitlePage = () => {


  const [entryArray, setEntryArray] = useState([]);
  const userid = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const location = useLocation();
  const {title} = location.state;

  const [openPopup, setOpenPopup] = useState(false)


  const [error, setError] = useState();
 

  const confirm = e => {

    setError(null)
  }
  

  const ref = useRef()

  const handleEntryValues = e => {


    const {name, value} = e.target;

    setEntryValues({
      ...entryValues,
      [name]: value
    })

  }

  const [entryValues, setEntryValues] = useState({
  
    userid: userid,
    titlename: title,
    content: ''

    



    
  })

  
  

  const handleEntryPost = (e, entry) => {
    e.preventDefault();

    if(ref.current.value.trim().length <= 0){
      setError({
        title: "Işlem başarısız",
        message: "Entry boş olamaz",
       
        
      })
      setOpenPopup(!openPopup)
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
        if(err.response.status === 401){

        }
      }
    )
  }



 

  useEffect(() => {

    RequestService.get("api/title/" + title).then(
        res => {
            console.log(res)
            setEntryArray(res.data)
           
           
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}, [title])


return (

  <div className='titlePage'>

  <div className='titlePageTitle'>
  {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          confirm={confirm}
         
        />
      )}

          <div className='titlePageTitleContainer'>
          <h2>{title}</h2>
          <p className='enterEntry' onClick={() => setOpenPopup(!openPopup)}><IoMdAddCircle /> Entry Giriniz</p>
          </div>

          </div>

          <div>
          {entryArray.map((entry) => {
        return (
          <TitlePageTemplate
            content={entry.entry.content}
            user={entry.user}
            writedate={entry.entry.writedate}
            likeCount = {entry.entry.likeCount}
            dislikeCount= {entry.entry.dislikeCount}
            
          />
        );
      })}

           
        
<Popup trigger={openPopup} title={title}>

<div className='modal'>

<div className='overlay'>
<div className='modalContent'>
  <h2>{title}</h2>
  <input type="text" placeholder='entry giriniz...' name='content' ref={ref} value={entryValues.content} onChange={handleEntryValues} className='captionEnter' required />
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
}


export default TitlePage

  



