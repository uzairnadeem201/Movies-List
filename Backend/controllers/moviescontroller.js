import MoviesManager from "../managers/moviesmanager.js";

class MoviesController {
  static async searchMovies(req, res, next) {
    try {
      const result = await MoviesManager.searchmovies(req);
      res.status(200).json(result);
    } catch (err) {
      console.error('Movie Fetch Error:', err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Movie Fetch failed',
      });
    }
  }

  static async listMovies(req, res, next) {
    try {
      const result = await MoviesManager.listmovies(req);
      res.status(200).json(result);
    } catch (err) {
      console.error('Movie list Error:', err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Movie list failed',
      });
    }
  }

  static async getlist(req, res, next) {
    try {
      const result = await MoviesManager.getUserLists(req);
      res.status(200).json(result);
    } catch (err) {
      console.error('Get List Error:', err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Fetching lists failed',
      });
    }
  }
}

export default MoviesController;

