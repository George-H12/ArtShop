# Arto

Hello and welcome to my ArtShop! 🎨 Explore a world of creativity and inspiration as you browse through a curated collection of unique artworks. Whether you're an art enthusiast or looking for the perfect piece to adorn your space, our diverse selection has something for everyone. Feel free to discover the beauty within each creation and embark on a journey of artistic expression. Thank you for visiting and sharing in the joy of art with us! 🖼️✨

Function: Users must first create an account. Once created they will be redirected to the feed where all non-digital art are posted for sale. Users will be able to like posts and buy as well. User will be able to post their paintings to the feed. I disallowed users to like their own paintings (That's for the ones who like their posts on Instagram). Users will be able to navigate to their own and others' profiles. The profile contains three tabs: Paintings for sale, Paintings sold, and Paintings bought. Similar to the feed, each tab will render a list of the user's paintings. That was a quick summary, here is a video of how the website works: [Arto](https://youtu.be/EZzNakfyxYg?si=vKeINQGYx3CC659n). 

What I used to build the application: React.js and CSS for the frontend, and MongoDB and Node.js for the backend. I created two main folders: api and client. The client folder handles the frontend and the api folder handles the backend. The application is basically running on two servers.

I only used two database models: the User and Post models.

## User Model

Here is an example of a user schema in Mongoose for managing user information in the ArtShop:

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
Like before most are self-explanatory. There is a reference to the user, which means that the user created post. The Likes attribute contains a list of all the users who liked the post.

![Alt Text](/ArtoImages/HomePage.png)
<img width="1440" alt="HomePage" src="https://github.com/George-H12/ArtShop/assets/78202573/2198ec03-d1e2-48c4-9f5c-ce0e9891dbc7">


