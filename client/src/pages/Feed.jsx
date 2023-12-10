import React, { useState, useEffect } from 'react'
import FeedHeader from '../components/FeedHeader'
import axios from 'axios'
import useUser from '../hooks/useUser.hook'
export default function Feed() {
  const { userData } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    axios.get('http://localhost:3000/api/post/feed') // Replace with your backend API endpoint
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); 

  return (
    <>
    <FeedHeader />
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          {/* Render other components or data related to the signed-in user */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <h2>Posts:</h2>
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <img src={post.image} alt={post.description} />
              <p>{post.description}</p>
              {userData && post.user === userData._id ? (
                // If the post belongs to the user, do not show the price
                <p>This is your post</p>
              ) : (
                // If the post does not belong to the user, show the price
                <p>Price: ${post.price}</p>
              )}
            </li>
          ))}
        </ul>
          
    </div>
    </>
  )
}
