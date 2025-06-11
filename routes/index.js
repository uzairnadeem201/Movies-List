import express from 'express';
import userroute from "./users.js";
const router = express.Router();


router.use('/auth', userroute);

export default router;