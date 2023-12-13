import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeedStyle.css';
import '../styles/HeaderStyle.css';
import axios from 'axios';
import useUser from '../hooks/useUser.hook';
import ImageModal from '../hooks/ImageModel';
import ApiClient from '../api/APIClient';

export default function Feed() {
  const { userData } = useUser();
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({}); 

  useEffect(() => {
    ApiClient.get('/api/post/feed')
      .then(response => {
        setPosts(response.data);
        
        const initialLikes = response.data.reduce((acc, post) => {
          acc[post._id] = post.likes.length; 
          return acc;
        }, {});
        setLikes(initialLikes);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); 



  const handleLike = async (postId) => {
    try {
      const response = await ApiClient.post(`/api/post/like/${postId}`);
      
      const { likes: newLikeCount } = response.data;
      
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: newLikeCount,
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  

  return (
    <>
      
      <nav className="navBar">
        <div id="Title">
            <h1>Arto</h1>
        </div>
        <div className="links">
        <ul>
        {userData ? (

          <a href={`/profile/${userData.username}`}>Profile</a>    
        ) : (
          <p>Loading user data...</p>
        )}
            <a href="/create"><li>Create</li></a>

            <a href="/"><li>Log Out</li></a>
        </ul>
        </div>
    </nav>
      <div className="feed-container">
        {userData ? (
          <div className="welcome-message">
            <h1>Welcome, {userData.username}!</h1>
            
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <h2>Posts:</h2>
        <ul className="posts-container">
          {posts.map(post => (
            <li key={post._id} className="post-item">
              <img src={post.image} alt={post.description} className="post-image" onClick={() => setSelectedImage(post.image)} />
              <a className="post-username" href={`/profile/${post.user.username}`}><li>{post.user.username}</li></a>
              <p className="post-description">{post.description}</p>
              {userData && post.user._id === userData._id ? (
                
                <>
                <p className="post-price">This is your post</p>
                <p className="post-price">Price: ${post.price}</p>
                <p className="like-count">{likes[post._id]} likes</p>

                </>
              ) : (
                
                <>
                  <p className="post-price">Price: ${post.price}</p>
                  <p className="like-count">{likes[post._id]} likes</p>
                  <button
                    className={`like-button ${likes[post._id] ? 'liked' : ''}`}
                    onClick={() => handleLike(post._id)}
                  >
                    Like
                  </button>
                  <Link to={`/buy/${post._id}`} className="buy-button">
                    Buy
                  </Link>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}



