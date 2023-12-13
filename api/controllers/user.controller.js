import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const getUserData = async (req, res, next) => {
    try {
        const token = req.cookies['session_token'];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = verifiedToken;
        console.log(verifiedToken);

        const userData = await User.findById(id);

        if (!userData) {
        return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = userData._doc;

      
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const buyPost = async (req, res, next) => {
    const {post_id} = req.body;
    console.log(post_id)
    try{
        const token = req.cookies['session_token'];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = verifiedToken;

        await User.findByIdAndUpdate(
            id,
            { $push: { paintingsBought: post_id } },
            { new: true }
          );
          await Post.findByIdAndUpdate(
            post_id,
            { forSale: false },
            { new: true }
          );

          res.status(200).json({ success: true, message: 'Post bought successfully' })

    }catch(error){
        next(error)
    }
};

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

