import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiClient from '../api/APIClient';

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
        // Send a POST request to the backend with post_id and dummy card details
        const response = await ApiClient.post('/api/user/buyArt', postData);
        // Handle the response as needed (e.g., show a success message)
        console.log('Buy request successful:', response.data);
        history('/feed');
    } catch (error) {
        console.error('Error submitting buy request:', error);
    }
    };

    return (
    <>

        <div className="buy-container">
    
        <h2>Buy Painting</h2>
        <form onSubmit={handleSubmit} className="buy-form">
            <label>
            Card Number:
            <input
                type="text"
                placeholder="1234 5678 9012 3456"
            />
            </label>
            <label>
            Expiry Date:
            <input
                type="text"
                placeholder="MM/YY"
            />
            </label>
            <label>
            CVV:
            <input
                type="text"
                placeholder="123"
            />
            </label>
            <label>
            Address:
            <textarea
                placeholder="Enter your address"
            />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    </>
    );
}
