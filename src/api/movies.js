import axios from "axios";

const api_key = "48d198c2c635e2c64caa41df6e4acda6";

const BASE_URL = "https://api.themoviedb.org/3/movie/";

const getPopularMovies = async function (page) {
  await axios.get(BASE_URL + "popular", {
    params: {
      api_key: api_key,
      page: page,
    },
  });
};

const getMoviesGenre = async (genre) =>
  await axios.get(BASE_URL + "movies/genre/" + genre);

const getMovie = async (id) => await axios.get(BASE_URL + "movies/" + id);

const getMovieReviews = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/reviews");

const getMovieCast = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/cast");

const getMovieImages = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/images");

const getMovieRecommendations = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/recommendations");

const getMovieSimilar = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/similar");

const getMovieKeywords = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/keywords");

const getMovieWatchProviders = async (id) =>
  await axios.get(BASE_URL + "movies/" + id + "/watch/providers");

const getMoviesYear = async (year) =>
  await axios.get(BASE_URL + "movies/year/" + year);

const getMoviesRating = async (rating) =>
  await axios.get(BASE_URL + "movies/rating/" + rating);

const getMoviesTitle = async (title) =>
  await axios.get(BASE_URL + "movies/title/" + title);

const getMoviesDirector = async (director) =>
  await axios.get(BASE_URL + "movies/director/" + director);

const getMoviesActor = async (actor) =>
  await axios.get(BASE_URL + "movies/actor/" + actor);

const getMoviesCountry = async (country) =>
  await axios.get(BASE_URL + "movies/country/" + country);

const getMoviesLanguage = async (language) =>
  await axios.get(BASE_URL + "movies/language/" + language);

const getMoviesProduction = async (production) =>
  await axios.get(BASE_URL + "movies/production/" + production);

const createMovie = async (movie) =>
  await axios.post(BASE_URL + "movies", movie);

const updateMovie = async (id, movie) =>
  await axios.put(BASE_URL + "movies/" + id, movie);

const deleteMovie = async (id) => await axios.delete(BASE_URL + "movies/" + id);

const getGenres = async () => await axios.get(BASE_URL + "genres");

const getGenre = async (id) => await axios.get(BASE_URL + "genres/" + id);

const createGenre = async (genre) =>
  await axios.post(BASE_URL + "genres", genre);

const updateGenre = async (id, genre) =>
  await axios.put(BASE_URL + "genres/" + id, genre);

const deleteGenre = async (id) => await axios.delete(BASE_URL + "genres/" + id);

export default {
  getPopularMovies,
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
