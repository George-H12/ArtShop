import React from 'react'
import '../styles/SignInStyle.css';
export default function SignUp() {
  return (
    <form action="">
      <div className="container">
          <div className="email">
              <input type="text" name = "Email" placeholder="Email" required/> 
          </div>
          <div className="password">
              <input type="text" name = "Password" placeholder="Password" required/>
          </div>
          <div className="submitButton">
              <input type="submit" value = "Login" />
          </div>
          
      </div>
</form>
  )
}
