# Arto

Hello and welcome to my ArtShop! 🎨 Explore a world of creativity and inspiration as you browse through a curated collection of unique artworks. Whether you're an art enthusiast or looking for the perfect piece to adorn your space, our diverse selection has something for everyone. Feel free to discover the beauty within each creation and embark on a journey of artistic expression. Thank you for visiting and sharing in the joy of art with us! 🖼️✨

Function: Users must first create an account. Once created they will be redirected to the feed where all non-digital art are posted for sale. Users will be able to like posts and buy as well. User will be able to post their paintings to the feed. I disallowed users to like their own paintings (That's for the ones who like their posts on Instagram). Users will be able to navigate to their own and others' profiles. The profile contains three tabs: Paintings for sale, Paintings sold, and Paintings bought. Similar to the feed, each tab will render a list of the user's paintings. That was a quick summary, here is a video of how the website works: [Arto](https://youtu.be/EZzNakfyxYg?si=vKeINQGYx3CC659n). 

What I used to build the application: React.js and CSS for the frontend, and MongoDB and Node.js for the backend. I created two main folders: api and client. The client folder handles the frontend and the api folder handles the backend. The application is basically running on two servers.

I only used two database models: the User and Post models.

## User Model


```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    paintingsBought: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post', // Reference to the Post model
        },
    ],
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
```
Most are pretty self-explanatory, but for the ones who do not understand MongoDB syntax, I created an array named paintingsBought which stores all the paintings the specific user buys.

### Post Model
```JavaScript
import mongoose from 'mongoose';

const postArt = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            max: 50,
            required: true,
          },
          likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User', 
            },
          ],
          price: {
            type: Number,
            required: true,
          },
          forSale: {
            type: Boolean,
            default: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
    },
);

const Post = mongoose.model('Post', postArt);

export default Post;
```
Like before most are self-explanatory. The user referenced is the owner of the post. The Likes attribute contains a list of all the users who liked the post.
### The Home page
<img width="1440" alt="HomePage" src="https://github.com/George-H12/ArtShop/assets/78202573/2198ec03-d1e2-48c4-9f5c-ce0e9891dbc7">
The home page gives a brief introduction on what the app is about and it contains links to the signup and signin pages.

```JavaScript
import React from 'react'
import Header from '../components/Header';
import MainContent from '../components/MainContent';
export default function Home() {
  return (
    <>
      <Header />
      <MainContent />
    </>
  )
}

```
```JavaScript
import React from 'react'
import Header from '../components/Header';
import MainContent from '../components/MainContent';
export default function Home() {
  return (
    <>
      <Header />
      <MainContent />
    </>
  )
}
```
```JavaScript
import React from 'react';
import '../styles/MainStyle.css'
export default function MainContent() {
  return (
    <div className="main-content">
        <div className = 'WelcomeTitle'>Welcome To Arto</div>
        <p>This site will provide talented artists who believe that 
            their art deserves to be recognized. Furthermore, users will be able to
            purchase any sort of non-digital art they see fit. Examples include arclyc and oil paintings. 
            Lately, there has been a push toward digital art and NFTs. Non-digital painters feel like their
            paintings are on their way to becoming obsolete. Therefore, Arto will provide these artists with
            the chance to shed light on their paintings and spread it all around the world.
            </p>
    </div>

  )
}
```
I used two small JSX files to build the home page.
```CSS
body{
    background-color: antiquewhite;
}

.navBar{
    display: flex;
    justify-content: space-between;
    background: rgb(48, 41, 41);
    height: 70px;
    align-items: center;
    color:bisque
}
#Title{
    margin-left: 10px;
    font-size: 50px;
}
.links{
    margin-right: 10px;
}

ul{
    width: 200px;
    display: flex;
    justify-content: space-around;
    margin-right: 20px;
}
ul li{
    text-decoration: none;
    transition: ease-in-out;
} 

.HeaderUl li:hover{
    color: hsl(271, 76%, 53%, 0.75);
}
```
```CSS

body{
    justify-content: center;
    align-items: center;
    font-family: 'Fredericka the Great', serif;
}


.main-content{
    margin-left: 12%;
    margin-top: 15%;
    width: 1100px;
}

.WelcomeTitle{
    font-size: 120px;
}

p{
    font-size: 20px;
}
```
I used HeaderStyle.css and MainStyle.css to style Header.jsx and MainContent.jsx respectively

## SignUp and SignIn pages

<img width="1440" alt="SignUp" src="https://github.com/George-H12/ArtShop/assets/78202573/a5166136-665c-48e2-a307-46e9d1d92d35">

<img width="1440" alt="SignIn" src="https://github.com/George-H12/ArtShop/assets/78202573/8c51ee18-d93f-46ea-9b4e-fb88c498cc82">

I used very similar code to build the two in the frontend


#### auth.controller.js file
Backend authorization file
```JavaScript
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    
    const {username, password} = req.body;
    const validUser = await User.findOne({username})
    if (validUser) return next(errorHandler(404, "User Already Exists!"))
    
    const newUser = new User({username, password})
    try {
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully!"
        });
    } catch (error){
        console.log(error);
        next(errorHandler(550, "error from the function"));
    }   
}

export const signin = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const validUser = await User.findOne({username})
       
        if (!validUser) return next(errorHandler(404, "User Not Found!"))

        if (password !== validUser.password) return next(errorHandler(401, "Incorrect Credentials!"))

        const token = jwt.sign({
            username: validUser.username,
            id: validUser._id,
        }, process.env.JWT_SECRET)
          
        res.cookie('session_token', token);
        res.status(200).json({ message: "Signin successful" });
        //res.status(200).json(rest);
    }catch(error){
        next(error);
    }
}
```
As you can see I handle errors and send data into the database depending on whether everything is valid. I also use JWT to create a session.

#### Signup.jsx
```JavaScript
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/SignInStyle.css';
import axios from 'axios';

export default function SignUp() {
  const history = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [fieldName]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: state.username,
      password: state.password
    };
    axios.post("http://localhost:3000/api/auth/signup", userData).then((response) => {
      console.log(response);
      history('/sign-in');
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="box">
          <div className="signTitle">
            <h2>Sign Up</h2><br />
          </div>
         
          <div className="email">
                <input 
                className = "textSign" 
                type="text" 
                name = "username"
                value = {state.username}
                onChange = {handleChange('username')}
                placeholder="username"
                required/> 
          </div>
          <div className="password">
              <input 
              className = "textSign" 
              type="text" 
              name = "Password"
              value = {state.password}
              onChange = {handleChange('password')} 
              placeholder="Password" 
              required/>
          </div>
          <div className="submitButton">
              <button id='signUpB' type = "submit">Sign up</button>
          </div>

        </div>
          
      </div>
    </form>
  )
}

```
I send data to the backend using the Axios package. After the submit button is pressed, the user is redirected to the SignIn page.

#### SignIn.jsx
```Javascript
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/SignInStyle.css';
import axios from 'axios';
import ApiClient from '../api/APIClient';
export default function SignIn() {
    const history = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: ""
      });
    
      const handleChange = (fieldName) => (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [fieldName]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
          username: state.username,
          password: state.password
        };
        ApiClient.post("/api/auth/signin", userData).then((response) => {
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
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="box">
              <div className="signTitle">
                <h2>Sign In</h2><br />
              </div>
             
              <div className="email">
                    <input 
                    className = "textSign" 
                    type="text" 
                    name = "username"
                    value = {state.username}
                    onChange = {handleChange('username')}
                    placeholder="username"
                    required/> 
              </div>
              <div className="password">
                  <input 
                  className = "textSign" 
                  type="text" 
                  name = "Password"
                  value = {state.password}
                  onChange = {handleChange('password')} 
                  placeholder="Password" 
                  required/>
              </div>
              <div className="submitButton">
                  {/* <input type="submit" value = "Login" /> */}
                  <button id='signUpB' type = "submit">Sign in</button>
              </div>
    
            </div>
              
          </div>
        </form>
      )
}

```
Similar to SignUp data is pushed into the backend where all the data is handled. After signing in, the user will be redirected to the Feed.

#### SignInStyle.css
```CSS
.container{
    max-width: 10px;
    height: 50vh;
    position: relative;
}

.box{
    position: absolute;
    left: 42%;
    top: 90%;
    width: 400px;
    height:30vh;
    background-color:rgb(230, 197, 163);
    justify-content: center;
    align-items: center;
    border-radius: 6px;
}
.email{
    margin-left: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    height: 50px;
    
}
.signTitle{
    margin-left: 40%;
    font-size: larger;
}

.textSign{
    height: 50px;
    width: 300px;
    border-radius: 10px;
}
.password{
    margin-bottom: 10px;
    margin-left: 20px;
}

.submitButton{
    margin-left: 80%;
    cursor: pointer;
    
}

#signUpB{
    background:brown;
    border-radius: 6px;
    font-size: larger;
}

#signUpB:hover{
    background-color: blueviolet;

}


```
The SignInStyle.css was used for both jsx files

### Feed Page
<img width="1440" alt="FeedPage" src="https://github.com/George-H12/ArtShop/assets/78202573/2eea024e-7ba3-40fe-bf30-d3e0bf892ac4">
The Feed Renders all the posts that are available FOR SALE ONLY from newest to oldest.

#### post.controller.js
```JavaScript
export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find({ forSale: true }).sort({ timestamp: -1 }).populate('user');
        res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Errorrrr' });
      }
    
}
```
The getAllPosts function is a function in the backend that gets all the posts from the data that is for sale from newest to oldest.

```JavaScript
export const toggleLike = async (req, res) => {
    const { postId } = req.params;
    
    const token = req.cookies['session_token'];
    console.log(token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = verifiedToken;
    console.log(id)
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      const isLiked = post.likes.includes(id);

      if (isLiked) {
        
        post.likes = post.likes.filter(likeId => likeId.toString() !== id.toString());
      } else {
        
        post.likes.push(id);
      }

    
      await post.save();
     
      await post.save();
  
      res.status(200).json({ success: true, likes: post.likes.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

```
The toggleLike function allows users to like and dislike a painting by clicking on one single button. It is similar to how the instagram like button works. You press it once for the first time and the database will register you as a person who liked the post. If you press it again, toggleLike checks if your id is in the likes attribute array of a particular post. If it is, then you will be removed from the array.

#### Feed.jsx
```JavaScript
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

```
This is the frontend file of the feed. It calls a lot of functions and interacts with the backend several times to get and post data.

<img width="1440" alt="CloseUpImage" src="https://github.com/George-H12/ArtShop/assets/78202573/8ce6d7fe-3f53-4372-8178-29435b85fb3e">
In the feed, I added a little animation to get a better look of each painting. All the user has to do is click on any painting.

This is a more detailed look at the code that handles this:
#### ImageModal.jsx
```JavaScript
// ImageModal.jsx
import React from 'react';

export default function ImageModal({ image, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={image} alt="Selected" />
      </div>
    </div>
  );
}

```
```JavaScript
 const [selectedImage, setSelectedImage] = useState(null);
// More Content
<img src={post.image} alt={post.description} className="post-image" onClick={() => setSelectedImage(post.image)} />
// More Content
{selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
 </>
```
#### FeedStyle.css
```CSS



.feed-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
 
  .welcome-message {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  
  .posts-container {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 300px 300px 300px;
    margin-left: 30%;
    gap: 50px;
  }
  
 
  .post-item {
    border: 1px solid #ccc;
    height: fit-content;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
  }
  
 
  .post-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  
  .post-description {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
 
  .post-price {
    color: #888;
    font-size: 14px;
  }
  
  .buy-button{
    margin-left: 90%;
    font-size: larger;
    background-color: hsl(0, 49%, 70%);
    border-radius: 6px;
    transition: ease-in-out;
  }
  .buy-button:hover{
    color:white;
    background-color: black;
  }

  .like-button{
    margin-top: 10px;
    font-size: larger;
  }


  
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    max-width: 30%;
    max-height: 80%;
    overflow: hidden;
  }
  
  .modal-content img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
```
This CSS file styles Feed.jsx. I designed the list of paintings to be formatted in a grid so users can scroll through the posts faster.

### Profile
<img width="1440" alt="PaintingsForSale" src="https://github.com/George-H12/ArtShop/assets/78202573/d4601557-ca56-4c8f-84fc-557f9080e99b">
<img width="1440" alt="PaintingsSold" src="https://github.com/George-H12/ArtShop/assets/78202573/8531b313-bc3d-471a-814d-90cc680830d8">
<img width="1440" alt="PaintingsBought" src="https://github.com/George-H12/ArtShop/assets/78202573/2b2b659d-a52e-4a35-b5f5-935bf43dc239">

The profile consists of three tabs. The For Sale tab lists user's posts that are for sale. The paintings sold tab lists the user's paintings that were sold. Finally, the paintings bought tab lists the paintings that were bought by the user.

#### user.controller.js
```JavaScript
export const getUserSalePosts = async (req, res) => {
    const { userName } = req.params;
    try {
    
       
        const user = await User.findOne({ username: userName });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
       
        const userPosts = await Post.find({ user: user._id, forSale: true });
    
        res.status(200).json(userPosts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}
```
The getUserSalePosts function in the backend was used to retrieve all the user's posts that are listed as For Sale.

```JavaScript
export const getUserSoldPosts = async (req, res) => {
    const { userName } = req.params;
    try {
       
        const user = await User.findOne({ username: userName });

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        
        
        const userSoldPosts = await Post.find({ user: user._id, forSale: false });

        res.status(200).json(userSoldPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
```
The getUserSoldPosts function in the backend was used to retrieve all the user's posts that are listed as Sold.


```JavaScript
export const getUserBoughtPosts = async (req, res) => {
    const { userName } = req.params;
    try {
        
        const user = await User.findOne({ username: userName });

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        const boughtPostsArray = user.paintingsBought;

        res.status(200).json(boughtPostsArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
```
The getUserBoughtPosts function in the backend was used to retrieve all the paintings that the user bought.

#### Profile.jsx
```JavaScript
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

```
Axios was used here to call each function listed before and retrieve data.

```CSS

.profile-container {
  width: 80%;
  height: 100%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
}

.title-container {
  text-align: center;
}

.profile-title {
  font-size: 24px;
}

.tabs-container {
  margin-top: 20px;
  width: 100%;

}

.tab-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around; 
  border-top: 1px solid #ccc; 
  margin-top: 10px; 
  width: 100%
}

.tab {
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.tab:hover {
  background-color: #f0f0f0;
}

.tab-panel {
  margin-top: 20px;
  width: 100%;
  display: grid;
}

.tab-content-title {
  color: #555;
}

.postProfile-item{
  width: 100%; 
  max-width: 300px; 
  margin-left: 40%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
}

#backtofeed{
  margin-right: 90%;
}

```
ProfileStyle.CSS was used to style Profile.jsx. As previously mentioned, the posts are listed in a grid format to help the user scroll better.


