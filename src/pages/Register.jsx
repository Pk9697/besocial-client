import React from 'react'

function Register() {
  return (
    <div className="login">
        <div className='widget-wrapper mw-700 login-wrapper'>
            <input className='login__input' type="text" placeholder='Name' />
            <input className='login__input' type="email" placeholder='Email' />
            <input className='login__input' type="password" placeholder='Password' />
            <input className='login__input' type="password" placeholder='Confirm Password' />
            <button className='login__input login__btn'>REGISTER</button>
        </div>
    </div>
  )
}

export default Register