import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import cookieParser from 'cookie-parser';


dotenv.config()
const app = express();


const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
};


app.use(cors(corsOptions));
app.use(cookieParser());


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
  }));

app.use(express.json({ limit: '10mb' }))


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


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode, 
        message,

    });
})