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


###auth.controller.js file
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


