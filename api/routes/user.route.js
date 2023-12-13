import express from 'express';
import { getUserData, buyPost } from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/userr', getUserData);
router.post('/buyArt', buyPost)

export default router;