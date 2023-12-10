import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import exifr from 'exifr';
import sharp from 'sharp';


// const storage = multer.diskStorage({
//     destination: function(req,file, cb) {
//         return cb(null, "../public/Images")
//     },
//     filename: function (req, file, cb) {
//         return cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// }); // Use memory storage for small files

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const __dirname = new URL('.', import.meta.url).pathname;
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         // Use an absolute path to the Images directory
//         const absolutePath = path.join(__dirname, '../public/Images');
//         return cb(null, absolutePath);
//     },
//     filename: function (req, file, cb) {
//         return cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage:storage});


export const getAllPosts = async (req, res) => {

    // const token = req.cookies['session_token'];
    // const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    //const { username } = verifiedToken;
    //console.log(verifiedToken);
    
    try {
        // Retrieve all posts in descending order of timestamp
        const posts = await Post.find({}).sort({ timestamp: -1 });
        res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Errorrrr' });
      }
    
}

// export const uploadImage = upload.single('image')

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
