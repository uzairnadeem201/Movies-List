import express from 'express';
import UsersController from '../controllers/userscontroller.js';
const router = express.Router();


router.post('/signup', UsersController.signup);
router.post('/login',UsersController.login);
router.get('/me',UsersController.me);

export default router;