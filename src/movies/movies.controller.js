const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validation middleware function:
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

// Route handlers:
async function list(req, res, next) {
  const movieIsShowing = req.query.is_showing;
  // If query param 'is_showing' is true, list movies only currently showing.
  if (movieIsShowing === 'true') {
    res.json({ data: await moviesService.listMoviesCurrentlyShowing() });
  }
  // If there is no query param, list all movies
  res.json({ data: await moviesService.list() });
}

async function read(req, res, next) {
  const { movie_id } = res.locals.movie;
  res.json({ data: await moviesService.read(movie_id) });
}

async function readTheatersByMovie(req, res, next) {
  const { movie_id } = res.locals.movie;
  res.json({ data: await moviesService.readTheatersByMovie(movie_id) });
}

async function readReviewsByMovie(req, res, next) {
  const { movie_id } = res.locals.movie;
  res.json({ data: await moviesService.readReviewsByMovie(movie_id) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheatersByMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheatersByMovie),
  ],
  readReviewsByMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviewsByMovie),
  ],
};
