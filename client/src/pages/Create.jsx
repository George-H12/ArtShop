// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useUser from '../hooks/useUser.hook';
// import axios from 'axios';

// export default function Create() {
//   const history = useNavigate();
//   const { userData, loading } = useUser();
//   const [formData, setFormData] = useState({
//     image: '',
//     description: '',
//     price: 0,
//     userId: userData ? userData._id : null,
//   });

//   useEffect(() => {
//     if (!loading && userData) {
//       setFormData((prevState) => ({
//         ...prevState,
//         userId: userData._id,
//       }));
//     }
//   }, [loading, userData]);

//   const handleChange = (fieldName) => (e) => {
//     const value = e.target.value;
//     setFormData((prevState) => ({
//       ...prevState,
//       [fieldName]: value,
//     }));
//   };

//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       let img = event.target.files[0];
//       setFormData((prevState) => ({
//         ...prevState,
//         image: img,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userData || loading) {
//       console.log("User data is not available yet.");
//       return;
//     }

//     const postData = new FormData();
//     postData.append('image', formData.image);
//     postData.append('description', formData.description);
//     postData.append('price', formData.price);
//     postData.append('userId', formData.userId);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/upload",
//         postData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       console.log(response);
//       //history('/feed');
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response);
//         console.log("Server responded with an error");
//       } else if (error.request) {
//         console.log("Network error");
//       } else {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <div>
//         {loading ? (
//           <p>Loading user data...</p>
//         ) : (
//           <div>
//             <h1>Welcome, {userData ? userData._id : 'User ID not available'}!</h1>
//           </div>
//         )}
//       </div>
//       <div>
//         <label htmlFor="image">Image URL:</label>
//         <h1>Select Image</h1>
//         <input type="file" name="myImage" onChange={onImageChange} />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           value={formData.description}
//           onChange={handleChange('description')}
//           maxLength={50}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="price">Price:</label>
//         <input
//           type="number"
//           id="price"
//           value={formData.price}
//           onChange={handleChange('price')}
//           required
//         />
//       </div>

//       <img style={{ width: '250px', height: 'auto' }} src={formData.image} />
//       <button type="submit">Create Post</button>
//     </form>
//   );
// }




import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import useUser from '../hooks/useUser.hook';
import axios from 'axios';
export default function Create() {
    const history = useNavigate();
    const { userData, loading } = useUser(); // Assuming useUser provides user information
    const [formData, setFormData] = useState({
      image: '',
      description: '',
      price: 0,
      userId: userData ? userData._id : null, // Include user ID in form data
    });
    useEffect(() => {
        // Log user data when it's available
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

    // const onImageChange = event => {
    //     if (event.target.files && event.target.files[0]) {
    //         let img = event.target.files[0];
    //         setFormData((prevState) => ({
    //             ...prevState,
    //             image: img
    //         }));
    //       }
    // }

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
        axios.post("http://localhost:3000/api/post/create", postData).then((response) => {
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
        
        <form onSubmit={handleSubmit}>
        <div>
        {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div>
          <h1>Welcome, {userData ? userData._id : 'User ID not available'}!</h1>
        </div>
      )}
    </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <h1>Select Image</h1>
        <input type="file" name="myImage" onChange={onImageChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange('description')}
          maxLength={50}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={handleChange('price')}
          required
        />
      </div>

      <img style={{ width: '250px', height: 'auto'}} src={formData.image} />
      <button type="submit">Create Post</button>
    </form>
    )
}
