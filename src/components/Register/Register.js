import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <main>


     
      <form className='registerLoginForm'>
      <h2 className='registrationLoginTitle'>hoş geldiniz, gelin sizi kayit edelim</h2>
     
        <label for="username">kullanıcı adı</label>
        <input type='text' className='registerLoginInput' placeholder='lütfen düzgün bir tercih yapınız...' />

        <label for="username">email</label>
        <input type='email' className='registerLoginInput' placeholder='herhalde gerçek mail adresini girersin...' />


        <label for="username">şifre</label>
        <input type='password' className='registerLoginInput' placeholder="güçlü ve unutulmayacak bir şifre seç..." />

        <p className='passwordConditions'>şifre kuralları:

        <p>büyük harf</p>
        <p>sayı</p>
        <p>3'den az ama 15'den fazla da olmasın</p>
        </p>
        
        <div className='registerLoginButtonField'>
          <button className='registerLoginButton'>hadi başlayalım !!!</button>
        </div>

      </form>
    </main>
  )
}

export default Register
