import React, {useState} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import useForm from '../FormValidation/useForm'

const Navbar = () => {


  function UserLoggedIn(props){
    return(
      <ul>
      <li>{props.text}</li>
      <li> <CgProfile /> </li>
      </ul>

    )

  }

  const {isLoggedIn} = useForm()


  
  return (
    <header>
      <div className='navigationBar'>
      <div className='navLogo'>
        <p>estüsözlük</p>
      </div>

      <nav className='topBar'>
               
        <ul>

          {isLoggedIn ?

<div>


    <UserLoggedIn text="ardi jorganxhi" />
  

</div>

:

<div>

<Link to='/login'>
    <li>giriş</li>
    </Link>

    
  
  <Link to='/register'>
    <li>kayıt ol</li>
  </Link>

</div>




          
        
        
        
        }
          
         
  
        
          
         
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
