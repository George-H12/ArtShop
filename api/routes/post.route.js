import express from 'express';
import { getAllPosts, insertPost} from '../controllers/post.controller.js';

const router = express.Router();

router.get("/feed", getAllPosts, insertPost);
router.post("/create", insertPost);

export default router;