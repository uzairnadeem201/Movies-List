import AppError from './apperror.js';
import MoviesConstants from '../constants/moviesconstants.js';

export function validateMoviesListInput(body) {
  const { name, movies } = body;

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    throw new AppError(MoviesConstants.ERRORS.INVALID_NAME, 400);
  }

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    throw new AppError(MoviesConstants.ERRORS.NO_MOVIES_PROVIDED, 400);
  }

  const hasInvalidMovie = movies.some(
    movie =>
      !movie.title || typeof movie.title !== 'string' ||
      !movie.poster_path || typeof movie.poster_path !== 'string'
  );

  if (hasInvalidMovie) {
    throw new AppError(MoviesConstants.ERRORS.INVALID_MOVIE_ITEM, 400);
  }
}
