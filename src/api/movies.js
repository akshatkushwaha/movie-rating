import axios from "axios";

const url = "http://localhost:8000/api/";

const BASE_URL = "https://api.themoviedb.org/3/";

const getMovies = async () => await axios.get(url + "movies");

const getMoviesGenre = async (genre) =>
  await axios.get(url + "movies/genre/" + genre);

const getMovie = async (id) => await axios.get(url + "movies/" + id);

const getMovieReviews = async (id) =>
  await axios.get(url + "movies/" + id + "/reviews");

const getMovieCast = async (id) =>
  await axios.get(url + "movies/" + id + "/cast");

const getMovieImages = async (id) =>
  await axios.get(url + "movies/" + id + "/images");

const getMovieRecommendations = async (id) =>
  await axios.get(url + "movies/" + id + "/recommendations");

const getMovieSimilar = async (id) =>
  await axios.get(url + "movies/" + id + "/similar");

const getMovieKeywords = async (id) =>
  await axios.get(url + "movies/" + id + "/keywords");

const getMovieWatchProviders = async (id) =>
  await axios.get(url + "movies/" + id + "/watch/providers");

const getMoviesYear = async (year) =>
  await axios.get(url + "movies/year/" + year);

const getMoviesRating = async (rating) =>
  await axios.get(url + "movies/rating/" + rating);

const getMoviesTitle = async (title) =>
  await axios.get(url + "movies/title/" + title);

const getMoviesDirector = async (director) =>
  await axios.get(url + "movies/director/" + director);

const getMoviesActor = async (actor) =>
  await axios.get(url + "movies/actor/" + actor);

const getMoviesCountry = async (country) =>
  await axios.get(url + "movies/country/" + country);

const getMoviesLanguage = async (language) =>
  await axios.get(url + "movies/language/" + language);

const getMoviesProduction = async (production) =>
  await axios.get(url + "movies/production/" + production);

const createMovie = async (movie) => await axios.post(url + "movies", movie);

const updateMovie = async (id, movie) =>
  await axios.put(url + "movies/" + id, movie);

const deleteMovie = async (id) => await axios.delete(url + "movies/" + id);

const getGenres = async () => await axios.get(url + "genres");

const getGenre = async (id) => await axios.get(url + "genres/" + id);

const createGenre = async (genre) => await axios.post(url + "genres", genre);

const updateGenre = async (id, genre) =>
  await axios.put(url + "genres/" + id, genre);

const deleteGenre = async (id) => await axios.delete(url + "genres/" + id);

export default {
  getMovies,
  getMoviesGenre,
  getMovie,
  getMovieReviews,
  getMovieCast,
  getMovieImages,
  getMovieRecommendations,
  getMovieSimilar,
  getMovieKeywords,
  getMovieWatchProviders,
  getMoviesYear,
  getMoviesRating,
  getMoviesTitle,
  getMoviesDirector,
  getMoviesActor,
  getMoviesCountry,
  getMoviesLanguage,
  getMoviesProduction,
  createMovie,
  updateMovie,
  deleteMovie,
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
