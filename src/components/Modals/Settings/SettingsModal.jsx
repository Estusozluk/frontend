import React from "react";
import Card from "../Card/Card";
import "./SettingsModal.css";

const SettingsModal = (props) => {
  return (
    <div>
      <div className="backdrop"></div>
      <Card className={"modal"}>
        <form action="">
          <header className="header">
            <h2>{props.title}</h2>
          </header>

          <div className="inputs">
            <label htmlFor="">Yeni E-mail</label>
            <input className="settingsInput" type="email" required />
            <label htmlFor="">Yeni kullanıcı adı</label>
            <input className="settingsInput" type="text" required />
            <label htmlFor="">Yeni şifre</label>
            <input className="settingsInput" type="password" required />
          </div>
          <footer className="actions">
            <button type="submit" onClick={props.confirm}>
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
