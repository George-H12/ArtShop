import express from 'express';
import { getAllPosts, insertPost, toggleLike, getPostById} from '../controllers/post.controller.js';

const router = express.Router();

router.get("/feed", getAllPosts, insertPost);
router.post("/create", insertPost);
router.post("/like/:postId", toggleLike);
router.get("/:postId", getPostById)



export default router;