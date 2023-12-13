import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import useUser from '../hooks/useUser.hook';
import '../styles/CreateStyle.css';
import axios from 'axios';
import ApiClient from '../api/APIClient';

export default function Create() {
    const history = useNavigate();
    const { userData, loading } = useUser(); 
    const [formData, setFormData] = useState({
      image: '',
      description: '',
      price: 0,
      userId: userData ? userData._id : null, 
    });
    useEffect(() => {
     
        if (!loading && userData) {
          console.log("User Data:", userData);
          setFormData((prevState) => ({
            ...prevState,
            userId: userData._id,
          }))
        }
      }, [loading, userData]);
  
    const handleChange = (fieldName) => (e) => {
      const value = e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          const fileReader = new FileReader();
          fileReader.onload = function (fileLoadedEvent) {
            const data = fileLoadedEvent.target.result;
            setFormData((prevState) => ({
              ...prevState,
              image: data,
            }));
          };
          fileReader.readAsDataURL(img);
        }
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!userData || loading) {
            console.log("User data is not available yet.");
            return;
          }

        const postData = {
            image: formData.image,
            description: formData.description,
            price: formData.price,
            userId: formData.userId
        };
        ApiClient.post("/api/post/create", postData).then((response) => {
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
    }


    return (
        
      <form onSubmit={handleSubmit} className='create-form'>

      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input type="file" name="myImage" onChange={onImageChange} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="descriptionInput"
          value={formData.description}
          onChange={handleChange('description')}
          maxLength={50}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input 
          type="number"
          id="priceInput"
          value={formData.price}
          onChange={handleChange('price')}
          required
        />
      </div>
      <button id = "CreateButton" type="submit">Create Post</button>
      <img className="preview-image" src={formData.image} alt="Preview" />
    </form>
    )
}
