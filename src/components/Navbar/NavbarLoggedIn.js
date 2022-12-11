import React from "react";
import {FaPowerOff} from 'react-icons/fa'
import "./Navbar.css";
import {Link} from "react-router-dom"

const NavbarLoggedIn = () => {

  function removeToken(){

    localStorage.removeItem('token')
  }
  return (
    <header>
      <div className="navigationBar">
        <Link to='/'>
        <div className="navLogo">

          <p>estüsözlük</p>
        </div>
        </Link>

     

        <nav className="bottomBar">
          <ul>
            <li>
            <div>
              <li>merhaba, ardi jorganxhi</li>
            </div>
            </li>
            
          
          </ul>
          <ul>
          <li>
            <FaPowerOff onClick={removeToken} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavbarLoggedIn;
