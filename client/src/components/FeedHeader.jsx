import React from 'react'
import '../styles/HeaderStyle.css';

export default function FeedHeader() {
  return (
    <nav className="navBar">
        <div id="Title">
            <h1>Arto</h1>
        </div>
        <div className="links">
        <ul>
            <a href="/profile"><li>Profile</li></a>
            <a href="/create"><li>Create</li></a>
            <a href="/"><li>Log Out</li></a>
        </ul>
        </div>
    </nav>
  )
}
