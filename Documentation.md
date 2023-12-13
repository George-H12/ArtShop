# Arto

Hello and welcome to my ArtShop! 🎨 Explore a world of creativity and inspiration as you browse through a curated collection of unique artworks. Whether you're an art enthusiast or looking for the perfect piece to adorn your space, our diverse selection has something for everyone. Feel free to discover the beauty within each creation and embark on a journey of artistic expression. Thank you for visiting and sharing in the joy of art with us! 🖼️✨

Function: Users must first create an account. Once created they will be redirected to the feed where all non-digital art are posted for sale. Users will be able to like posts and buy as well. User will be able to post their paintings to the feed. I disallowed users to like their own paintings (That's for the ones who like their posts on Instagram). Users will be able to navigate to their own and others' profiles. The profile contains three tabs: Paintings for sale, Paintings sold, and Paintings bought. Similar to the feed, each tab will render a list of the user's paintings. That was a quick summary, here is a video of how the website works: [Arto](https://youtu.be/EZzNakfyxYg?si=vKeINQGYx3CC659n). 

What I used to build the application: React.js and CSS for the frontend, and MongoDB and Node.js for the backend.

I only used two database models: the User and Post models.

## User Schema

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

