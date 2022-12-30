import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const getPopularMovies = async (page) =>
  await axios.get(BASE_URL + "/movie/popular", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getMoviesGenres = async () =>
  await axios.get(BASE_URL + "/genre/movie/list", {
    params: {
      api_key: api_key,
    },
  });

const getMovie = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id, {
    params: {
      api_key: api_key,
    },
  });

const getMovieProviders = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/watch/providers", {
    params: {
      api_key: api_key,
    },
  });

const getMovieDetails = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/credits", {
    params: {
      api_key: api_key,
    },
  });

const getSimilarMovies = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/similar", {
    params: {
      api_key: api_key,
    },
  });

const getTopRatedMovies = async (page) =>
  await axios.get(BASE_URL + "/movie/top_rated", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getUpcomingMovies = async (page) =>
  await axios.get(BASE_URL + "/movie/upcoming", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getNowPlayingMovies = async (page) =>
  await axios.get(BASE_URL + "/movie/now_playing", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getLatestMovie = async (page) =>
  await axios.get(BASE_URL + "/movie/latest", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getMovieUsingQuery = async (query) =>
  await axios.get(BASE_URL + "/search/multi", {
    params: {
      api_key: api_key,
      query: query,
    },
  });

const getMovieExternalIds = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/external_ids", {
    params: {
      api_key: api_key,
    },
  });

const getMoviesByGenre = async (genreId, page) =>
  await axios.get(BASE_URL + "/discover/movie", {
    params: {
      api_key: api_key,
      with_genres: genreId,
      page: page,
      // sort_by: "vote_average.desc",
    },
  });

const getMovieVideos = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/videos", {
    params: {
      api_key: api_key,
    },
  });

const getMovieImages = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/images", {
    params: {
      api_key: api_key,
    },
  });

const getMovieReviews = async (id) =>
  await axios.get(BASE_URL + "/movie/" + id + "/reviews", {
    params: {
      api_key: api_key,
    },
  });

export {
  getPopularMovies,
  getMovie,
  getMoviesGenres,
  getMovieProviders,
  getMovieDetails,
  getSimilarMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getLatestMovie,
  getMovieUsingQuery,
  getMovieExternalIds,
  getMoviesByGenre,
  getMovieVideos,
  getMovieImages,
  getMovieReviews,
};
