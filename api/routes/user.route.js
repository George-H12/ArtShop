import express from 'express';
import { getUserData } from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/userr', getUserData);

export default router;