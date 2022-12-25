import React from "react";
import { FaPowerOff } from "react-icons/fa";
import "./Navbar.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BiPowerOff } from "react-icons/bi";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import ChoiceModal from "../UI/ChoiceModal/ChoiceModal";

const NavbarLoggedIn = () => {
  const [userName, setUserName] = useState(localStorage.getItem("username"));
  const [error, setError] = useState();
  const [choice, setChoice] = useState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    setChoice({
      title: "Nereye gidiyorsun :(",
      message: "Beni cidden terk mi edeceksin ?",
    });
    /*let logoutConfirmed = window.confirm("Gerçekten terk mi edeceksin beni ?");
    console.log(logoutConfirmed);
    if (logoutConfirmed === false) {
      //alert("Canımsın <333");
      return;
    }
    localStorage.removeItem("token");
    window.location.reload();*/
  };

  const userNotLeft = () => {
    setChoice(null);
  };

  const userLeft = () => {
    navigate("/login");
    localStorage.removeItem("token");
    window.location.reload();
    setChoice(null);

    return;
  };

  return (
    <div>
      {choice && (
        <ChoiceModal
          title={choice.title}
          message={choice.message}
          yes={userLeft}
          no={userNotLeft}
        />
      )}
      <header>
        <div className="navigationBar">
          <div className="navLogo">
            <Link to="/">
              <p>estüsözlük</p>
            </Link>
          </div>
          <div className="searchBar">
            <input
              type="text"
              className="searchInput"
              placeholder="Search for entry titles"
            />
          </div>

          <div className="bottomBar">
            <Link to="/profile">
              <i>
                {userName}
                <BsFillPersonFill />
              </i>
            </Link>

            <i>
              <BiPowerOff onClick={logoutHandler} />
            </i>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarLoggedIn;
