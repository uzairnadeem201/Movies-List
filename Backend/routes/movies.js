import express from 'express';
import MoviesController from '../controllers/moviescontroller.js';
const router = express.Router();


router.get('/search', MoviesController.searchMovies);
router.post('/list',MoviesController.listMovies);
router.get('/list',MoviesController.getlist);


export default router;