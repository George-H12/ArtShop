import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/SignInStyle.css';
import axios from 'axios';
export default function SignIn() {
    const history = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: ""
      });
    
      const handleChange = (fieldName) => (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [fieldName]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
          username: state.username,
          password: state.password
        };
        axios.post("http://localhost:3000/api/auth/signin", userData, { withCredentials: true }).then((response) => {
          console.log(response);
          history('/feed');
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="box">
              <div className="signTitle">
                <h2>Sign In</h2><br />
              </div>
             
              <div className="email">
                    <input 
                    className = "textSign" 
                    type="text" 
                    name = "username"
                    value = {state.username}
                    onChange = {handleChange('username')}
                    placeholder="username"
                    required/> 
              </div>
              <div className="password">
                  <input 
                  className = "textSign" 
                  type="text" 
                  name = "Password"
                  value = {state.password}
                  onChange = {handleChange('password')} 
                  placeholder="Password" 
                  required/>
              </div>
              <div className="submitButton">
                  {/* <input type="submit" value = "Login" /> */}
                  <button id='signUpB' type = "submit">Sign in</button>
              </div>
    
            </div>
              
          </div>
        </form>
      )
}
