import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import useForm from '../FormValidation/useForm'

const Login = () => {

  const {handleChange, handleLoginSubmit, validateInfo, handleLoginChange, loginValues} = useForm();
  return (
    <main>
        <form className='registerLoginForm'>
      <h2 className='registrationLoginTitle'>oo kimler gelmiş, tekrardan hoş geldin</h2>
     
       <Link to='/register'>
        <p className='passToRegister'>ya da ilk defa mı geliyorsun? seni kayıt ol kısmına alalım hemen...</p>
       </Link>

        <label for="username">kullanıcı adı</label>
        <input type='text' className='registerLoginInput' placeholder='seni burda görmek bize şeref verdi...' name='username' value={loginValues.username} onChange={handleLoginChange}  />


        <label for="password">şifre</label>
        <input type='password' className='registerLoginInput' placeholder="şifreyi hatırlıyorsan bizi çok memnun edersin..." name='password' value={loginValues.password} onChange={handleLoginChange} />



        
        
        <div className='registerLoginButtonField loginPart'>
          <button className='registerLoginButton' onClick={handleLoginSubmit}>artık resmen hoş geldin !</button>
        </div>

      </form>
    </main>
  )
}

export default Login
