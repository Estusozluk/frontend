import React from "react";
import { FaPowerOff } from "react-icons/fa";
import "./Navbar.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BiPowerOff } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const NavbarLoggedIn = () => {
  const [userName, setUserName] = useState(localStorage.getItem("username"));

  const logoutHandler = () => {
    let logoutConfirmed = window.confirm("Gerçekten terk mi edeceksin beni ?");
    console.log(logoutConfirmed);
    if (logoutConfirmed === false) {
      alert("Canımsın <333");
      return;
    }
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
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
  );
};

export default NavbarLoggedIn;
