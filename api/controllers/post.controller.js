import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';


export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find({ forSale: true }).sort({ timestamp: -1 }).populate('user');
        res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Errorrrr' });
      }
    
}



export const insertPost =  async (req, res) => {

    const {image, description, price, userId} = req.body;
    
    try {
        
        const newPost = new Post({
        image,
        description,
        price,
        user: userId, 
        });

        await newPost.save();

        res.status(201).json({
        success: true,
        message: 'Post created successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        });
    }

}

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

  export const getPostById = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  

  

