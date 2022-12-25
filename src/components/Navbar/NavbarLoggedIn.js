import React from "react";
import { FaPowerOff } from "react-icons/fa";
import "./Navbar.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BiPowerOff } from "react-icons/bi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "../SearchBar/SearchBar";
import ChoiceModal from "../Modals/Choice/ChoiceModal";

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

        <SearchBar />

        

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
