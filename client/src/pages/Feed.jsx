import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import FeedHeader from '../components/FeedHeader';
import '../styles/FeedStyle.css';
import axios from 'axios';
import useUser from '../hooks/useUser.hook';
import ImageModal from '../hooks/ImageModel';
import ApiClient from '../api/APIClient';

export default function Feed() {
  const { userData } = useUser();
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({}); // Track likes for each post

  useEffect(() => {
    ApiClient.get('/api/post/feed')
      .then(response => {
        setPosts(response.data);
        // Initialize likes state with the initial likes from the server
        const initialLikes = response.data.reduce((acc, post) => {
          acc[post._id] = post.likes || 0;
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
      // Update the likes state with the new like count from the server
      setLikes(prevLikes => ({
        ...prevLikes,
        [postId]: response.data.likes,
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <>
      <FeedHeader />
      <div className="feed-container">
        {userData ? (
          <div className="welcome-message">
            <h1>Welcome, {userData.username}!</h1>
            {/* Render other components or data related to the signed-in user */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <h2>Posts:</h2>
        <ul className="posts-container">
          {posts.map(post => (
            <li key={post._id} className="post-item">
              <img src={post.image} alt={post.description} className="post-image" onClick={() => setSelectedImage(post.image)} />
              <p className="post-description">{post.description}</p>
              {userData && post.user === userData._id ? (
                // If the post belongs to the user, do not show the price
                <p className="post-price">This is your post</p>
              ) : (
                // If the post does not belong to the user, show the price, like button, and Buy button
                <>
                  <p className="post-price">Price: ${post.price}</p>
                  <button className="like-button" onClick={() => handleLike(post._id)}>
                    {likes[post._id]} {likes[post._id] === 1 ? 'like' : 'likes'}
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
