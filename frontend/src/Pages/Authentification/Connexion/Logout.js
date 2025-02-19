import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import "./Logout.css"

const Logout = () => {
  return (
    <div className='wrapper'>
      <form action=''>
        <h1>Login</h1>
         <div className="input-box">
            <input type='text' placeholder ='Email' required/>
            <FaUser className='icon'/>
         </div>

         <div className="input-box">
            <input type='password' placeholder ='Password' required/>
            <FaLock className='icon'/>
         </div>

         <div className="remember-forgot">
            <label><input type='checkbox' />remember me</label>
            <a href='#'>forgot password?</a>
         </div>

         <button type='submit'>Login</button>
         <div className='register-link'>
           <p>Don't have an account?<a href='#'>Register</a></p>
         </div>
      </form>
    </div>
  )
}

export default Logout
