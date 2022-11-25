import React from 'react'
import avatar from "../public/avatar.svg";

const LoginForm = () => {
  return (
    <section className='container'>
      <div className='box'>
        <div className='form'>
            <h2>Sig in</h2>
            <div className='inputBox'>
              <input type="text" required="required" />
              <span>Username</span>
              <i></i>
            </div>

            <div className='inputBox'>
              <input type="password" required="required" />
              <span>Password</span>
              <i></i>
            </div>

            <div className='links'>
              <a href="#">Forgot password</a>
              <a href="#">Signup</a>
            </div>

            <input type="submit" value="Login"/>

        </div>
      </div>
    </section>
  )
}


export default LoginForm

