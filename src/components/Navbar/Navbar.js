import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {


  
  return (
    <header>
      <div className='navigationBar'>
      <div className='navLogo'>
        <p>estüsözlük</p>
      </div>

      <nav className='topBar'>
        <ul>
          <Link to='/login'>
          <li>giriş</li>
          </Link>

          <Link to='/register'>
          <li>kayıt ol</li>
          </Link>
        </ul>
      </nav>

      <nav className='bottomBar'>
        <ul>
          <li>#gündem</li>
          <li>#spor</li>
          <li>#siyaset</li>
          <li>#teknoloji</li>
          <li>#estü</li>
        </ul>
      </nav>
      </div>
    </header>
  )
}

export default Navbar
