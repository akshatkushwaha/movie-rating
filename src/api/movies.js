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

const getGenres = async () =>
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

export {
  getPopularMovies,
  getMovie,
  getGenres,
  getMovieProviders,
  getMovieDetails,
  getSimilarMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getLatestMovie,
  getMovieUsingQuery,
};
