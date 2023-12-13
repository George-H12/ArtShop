import express from 'express';
import { getUserData, buyPost, getUserSalePosts, getUserSoldPosts, getUserBoughtPosts } from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/userr', getUserData);
router.post('/buyArt', buyPost)
router.get('/ForSale/:userName', getUserSalePosts);
router.get('/Sold/:userName', getUserSoldPosts);
router.get('/Bought/:userName', getUserBoughtPosts);

export default router;