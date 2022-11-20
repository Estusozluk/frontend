import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <main>
        <form className='registerLoginForm'>
      <h2 className='registrationLoginTitle'>oo kimler gelmiş, tekrardan hoş geldin</h2>
     
       <Link to='/register'>
        <p className='passToRegister'>ya da ilk defa mı geliyorsun? seni kayıt ol kısmına alalım hemen...</p>
       </Link>

        <label for="username">email</label>
        <input type='email' className='registerLoginInput' placeholder='seni burda görmek bize şeref verdi...' />


        <label for="username">şifre</label>
        <input type='password' className='registerLoginInput' placeholder="şifreyi hatırlıyorsan bizi çok memnun edersin..." />



        
        
        <div className='registerLoginButtonField loginPart'>
          <button className='registerLoginButton'>artık resmen hoş geldin !</button>
        </div>

      </form>
    </main>
  )
}

export default Login
