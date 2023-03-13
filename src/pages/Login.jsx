import React from 'react'

function Login() {
  return (
    <div className="login">
        <div className='widget-wrapper mw-700 login-wrapper'>
            <input className='login__input' type="email" placeholder='Email' />
            <input className='login__input' type="password" placeholder='Password' />
            <button className='login__input login__btn'>LOGIN</button>
        </div>
    </div>
  )
}

export default Login