import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiClient from '../api/APIClient';
import '../styles/BuyStyle.css';

export default function Buy() {
  // Access the post_id from the URL parameters
  const history = useNavigate();
  const { post_id } = useParams();

const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
        post_id,
    };
    try {
        
        const response = await ApiClient.post('/api/user/buyArt', postData);
        
        console.log('Buy request successful:', response.data);
        history('/feed');
    } catch (error) {
        console.error('Error submitting buy request:', error);
    }
    };

    return (
    <>

<div className="buy-container">
        <h2 className="buy-heading">Buy Painting</h2>
        <form onSubmit={handleSubmit} className="buy-form">
          <label htmlFor="cardNumber" className="buy-label">
            Card Number:
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="buy-input"
              required = "true"
            />
          </label>
          <label htmlFor="expiryDate" className="buy-label">
            Expiry Date:
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              className="buy-input"
              required = "true"
            />
          </label>
          <label htmlFor="cvv" className="buy-label">
            CVV:
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="buy-input"
              required = "true"
            />
          </label>
          <label htmlFor="address" className="buy-label">
            Address:
            <textarea
              id="address"
              placeholder="Enter your address"
              className="buy-textarea"
              required = "true"
            />
          </label>
          <button type="submit" className="buy-submit">
            Buy
          </button>
        </form>
      </div>
    </>
    );
}
