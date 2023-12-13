import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// Controller function to fetch user data
export const getUserData = async (req, res, next) => {
    try {
        const token = req.cookies['session_token'];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = verifiedToken;
        console.log(verifiedToken);

        // const { id } = req.session.user;
        // console.log(id)
        //     // Use the user ID or username to fetch additional user data from the database
        const userData = await User.findById(id);

        if (!userData) {
        return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = userData._doc;

        // Send the user data in the response
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

