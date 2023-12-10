import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongo from 'connect-mongo'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import Post from './models/post.model.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
// const MongoStore = connectMongo(session);
// const storage = multer.memoryStorage(); // Store the file in memory as a buffer
// const upload = multer({ storage });

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']; // Add other origins as needed
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies)
};


app.use(cors(corsOptions));
app.use(cookieParser());
//app.use(cors())

app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    store: new session.MemoryStore(),
  }));

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const storage = multer.diskStorage({
// destination: function(req, file, cb) {
//     // Use an absolute path to the Images directory
//     const absolutePath = path.join(__dirname, './public/Images');
//     return cb(null, absolutePath);
// },
// filename: function (req, file, cb) {
//     return cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
// }
// });

// const storage = multer.diskStorage({
//     destination: function(req,file, cb) {
//         return cb(null, 'Images')
//     },
//     filename: function (req, file, cb) {
//         return cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// }); // Use memory storage for small files
// const upload = multer({ storage:storage});



app.use(express.json({ limit: '10mb' }))

// app.use(upload.single('image'));

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

// app.post("/api/upload", upload.single('image'), async (req,res) => {
//     const {description, price, userId} = req.body;
//     // const imageBuffer = req.file.buffer;
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Image file is required.',
//             });
//         }
//         const image = req.file.filename;

//         const newPost = new Post({
//         image,
//         description,
//         price,
//         user: userId, 
//         });

//         await newPost.save();

//         res.status(201).json({
//         success: true,
//         message: 'Post created successfully!',
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//         success: false,
//         message: 'Internal Server Error',
//         });
//     }
// })

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode, 
        message,

    });
})