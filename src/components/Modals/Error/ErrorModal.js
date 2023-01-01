import React from "react";
import Card from "../Card/Card";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className="backdrop"></div>
      <Card className={"modal"}>
        <header className="header">
          <h2>{props.title}</h2>
        </header>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <footer className="actions">
          <button onClick={props.confirm}>Ok</button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;