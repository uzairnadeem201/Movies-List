import express from 'express';
import userroute from "./users.js";
import moviesroute from "./movies.js";
import jwtMiddleware from '../middleware/jwtverification.js';
const router = express.Router();


router.use('/auth', userroute);
router.use('/movies',jwtMiddleware,moviesroute);

export default router;