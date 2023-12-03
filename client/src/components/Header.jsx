import React from 'react';
import '../styles/HeaderStyle.css';


export default function Header() {
  return (
    <nav className="navBar">
        <div id="Title">
            <h1>Arto</h1>
        </div>
        <div className="links">
        <ul>
            <a href="/"><li>Home</li></a>
            <a href="/sign-in"><li>Sign In</li></a>
            <a href="/sign-up"><li>Sign Up</li></a>
            
        </ul>
        </div>
    </nav>
  )
}
