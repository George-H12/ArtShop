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
