import axios from "axios";
import AppError from "../utils/apperror.js";
import MoviesConstants from "../constants/moviesconstants.js";
import MoviesHandler from "../handlers/movieshandler.js";
import { validateMoviesListInput } from "../utils/validateMoviesList.js";

class MoviesManager {
  static async searchmovies(req) {
    const query = req.query.query;

    if (!query || query.trim() === "") {
      throw new AppError(MoviesConstants.ERRORS.EMPTY_QUERY, 400);
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`;

    const response = await axios.get(url);

    if (!response.data || !response.data.results || response.data.results.length === 0) {
      throw new AppError(MoviesConstants.ERRORS.NO_RESULTS_FOUND, 404);
    }

    return response.data.results;
  }

  static async listmovies(req) {
    validateMoviesListInput(req.body);

    const { name, tags = [], description, movies } = req.body;
    const userId = req.user.id;

    const titles = movies.map(movie => movie.title.trim());
    const images = movies.map(movie => movie.poster_path.trim());
    const newList = await MoviesHandler.createList({
      name: name.trim(),
      tags,
      description: description?.trim(),
      titles,
      images,
      userId,
    });

    if (!newList) {
      throw new AppError(MoviesConstants.ERRORS.FAILED_TO_CREATE_LIST || "Failed to create list", 500);
    }

    return {
      success: true,
      message: 'List created successfully',
      data: newList
    };
  }
}

export default MoviesManager;

