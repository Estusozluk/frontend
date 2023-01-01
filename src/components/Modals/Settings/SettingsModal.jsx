import React, {useState} from "react";
import Card from "../Card/Card";
import "./SettingsModal.css";
import RequestService from "../../../services/RequestService";
import ErrorModal from "../Error/ErrorModal";
import { useNavigate } from "react-router-dom";

const SettingsModal = (props) => {


  
  let userid = localStorage.getItem("userId");
  let username = localStorage.getItem("username");
  let email = localStorage.getItem("email");
  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [updateValues, setUpdateValues] = useState({
    username: username,
    email: email
  })

  const [error, setError] = useState();


  const handleUpdate = e => {
    const { name, value } = e.target;

  
    

      setUpdateValues({
        ...updateValues,
        [name]: value,
      });

    

  
  }

  const handleValue = e => {
    if(e.target.value == ""){
      return username;
    }
    else{
      return e.target.value;
    }
  }

  const updatePost = e => {
    e.preventDefault();
    

    RequestService.put("api/User/update/" + userid, updateValues,{headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
      Authorization: "Bearer " + token,
    }}).then(
      res => {
        
        if(res.status === 200){
          setError({
            title: "Başarılı işlem",
            message: "Bilgileriniz güncellendi",
          });
          
          localStorage.removeItem("token");
          navigate("/");
          window.location.reload();
          
        }
      }
    ).catch(
      err => {
        console.log(err);
      }
    )

    
  }
  return (
    <div>
        {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          
        />
      )}
      <div className="backdrop"></div>
      <Card className={"modal"}>
        <form action="">
          <header className="header">
            <h2>{props.title}</h2>
          </header>

          <div className="inputs">
          <label htmlFor="">Yeni kullanıcı adı</label>
            <input className="settingsInput" type="text" name="username" onChange={handleUpdate}  required />
            <label htmlFor="">Yeni E-mail</label>
            <input className="settingsInput" type="email" name="email" onChange={handleUpdate} required />
        
           
          </div>
          <footer className="actions">
            <button type="submit" onClick={updatePost}>
              Onayla
            </button>
            <button onClick={props.close}>Kapat</button>
          </footer>
        </form>
      </Card>
    </div>
  );
};

export default SettingsModal;
