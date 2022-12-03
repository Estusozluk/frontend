import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import useForm from '../FormValidation/useForm'

const Navbar = () => {


  function UserLoggedIn(props) {
    return (
      <ul>
        <li>{props.text}</li>
        <li> <CgProfile /> </li>
      </ul>

    )

  }

  const { isLoggedIn } = useForm()



  return (

    <header>
      <div className='navigationBar'>
        <Link to='/'>
        <div className='navLogo'>
          <div>estüsözlük</div>
        </div>
        </Link>


        <div className='bottomBar'>
            <div>#gündem</div>
            <div>#spor</div>
            <div>#siyaset</div>
            <div>#teknoloji</div>
            <div>#estü</div>
        </div>

        <nav className='topBar'>
          
            

              <Link to='/login'>
                <div>giriş</div>
              </Link>

              <Link to='/register'>
                <div>kayıt ol</div>
              </Link>

            
          
        </nav>
      </div>
    </header>
  )
}

export default Navbar
