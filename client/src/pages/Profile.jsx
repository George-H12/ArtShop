// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import '../styles/ProfileStyle.css'
import ApiClient from '../api/APIClient';

export default function Profile() {
  const {userName} = useParams()
  const [paintingsForSale, setPaintingsForSale] = useState([]);
  const [paintingsSold, setPaintingsSold] = useState([]);
  const [paintingsBought, setPaintingsBought] = useState([]);

  useEffect(() => {
    
    const fetchPaintingsForSale = async () => {
      try {
        const response = await ApiClient.get(`/api/user/ForSale/${userName}`);
        setPaintingsForSale(response.data);
      } catch (error) {
        console.error('Error fetching paintings for sale:', error);
      }
    };

    
    const fetchPaintingsSold = async () => {
      try {
        const response = await ApiClient.get(`/api/user/Sold/${userName}`);
        setPaintingsSold(response.data);
      } catch (error) {
        console.error('Error fetching paintings sold:', error);
      }
    };

   
    const fetchPaintingsBought = async () => {
      try {
        const response = await ApiClient.get(`/api/user/Bought/${userName}`);
        const boughtPostIds = response.data; 
        const promises = boughtPostIds.map(async (postId) => {
          const postResponse = await ApiClient.get(`/api/post/${postId}`);
          return postResponse.data;
        });
    
        
        const boughtPostsData = await Promise.all(promises);
    
        setPaintingsBought(boughtPostsData);
      } catch (error) {
        console.error('Error fetching paintings bought:', error);
      }
    };

    fetchPaintingsForSale();
    fetchPaintingsSold();
    fetchPaintingsBought();
  }, [userName]);
  
  return (
    <div className="profile-container">
      <div className="title-container">
      <a id = "backtofeed" href="/feed">Back to Feed</a>
        {userName ? (
          <h1 className="profile-title">{userName}</h1>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <Tabs className="tabs-container">
        <TabList className="tab-list">
          <Tab className="tab">Paintings for Sale</Tab>
          <Tab className="tab">Paintings Sold</Tab>
          <Tab className="tab">Paintings Bought</Tab>
        </TabList>

        <TabPanel className="tab-panel">
          <ul className="posts-container">
            {paintingsForSale.map(post => (
              <li key={post._id} className="postProfile-item">
                {/* Render content for Paintings for Sale */}
                <img src={post.image} alt={post.description} className="post-image" />
                <p className="post-description">{post.description}</p>
                <p className="post-likes">Likes: {post.likes.length}</p>
                <p className="post-price">Price: ${post.price}</p>
                {/* Add any other content you want to display */}
              </li>
            ))}
          </ul>
        </TabPanel>

        <TabPanel className="tab-panel">
          <ul className="posts-container">
            {paintingsSold.map(post => (
              <li key={post._id} className="postProfile-item">
                {/* Render content for Paintings Sold */}
                <img src={post.image} alt={post.description} className="post-image" />
                <p className="post-description">{post.description}</p>
                <p className="post-likes">Likes: {post.likes.length}</p>
                <p className="post-price">Price: ${post.price}</p>
                {/* Add any other content you want to display */}
              </li>
            ))}
          </ul>
        </TabPanel>

        <TabPanel className="tab-panel">
        <ul className="posts-container">
              {paintingsBought.map(post => (
              <li key={post._id} className="postProfile-item">
                
                <img src={post.image} alt={post.description} className="post-image" />
                <p className="post-description">{post.description}</p>
                <p className="post-likes">Likes: {post.likes.length}</p>
                <p className="post-price">Price: ${post.price}</p>
                
              </li>
            ))}
        </ul>
        </TabPanel>
      </Tabs>
  
    </div>
  );
}
