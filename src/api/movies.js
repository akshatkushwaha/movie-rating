import axios from "axios";

const api_key = "48d198c2c635e2c64caa41df6e4acda6";

const BASE_URL = "https://api.themoviedb.org/3/movie/";

const getPopularMovies = async (page) =>
  await axios.get(BASE_URL + "popular", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getGenres = async () =>
  await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
    params: {
      api_key: "48d198c2c635e2c64caa41df6e4acda6",
    },
  });

const getMovie = async (id) =>
  await axios.get(BASE_URL + id, {
    params: {
      api_key: api_key,
    },
  });

const getMovieProviders = async (id) =>
  await axios.get(BASE_URL + id + "/watch/providers", {
    params: {
      api_key: api_key,
    },
  });

const getMovieDetails = async (id) =>
  await axios.get(BASE_URL + id + "/credits", {
    params: {
      api_key: api_key,
    },
  });

const getSimilarMovies = async (id) =>
  await axios.get(BASE_URL + id + "/similar", {
    params: {
      api_key: api_key,
    },
  });

const getTopRatedMovies = async (page) =>
  await axios.get(BASE_URL + "top_rated", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getUpcomingMovies = async (page) =>
  await axios.get(BASE_URL + "upcoming", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getNowPlayingMovies = async (page) =>
  await axios.get(BASE_URL + "now_playing", {
    params: {
      api_key: api_key,
      page: page,
    },
  });

const getLatestMovie = async (page) =>
  await axios.get(BASE_URL + "latest", {
    params: {
      api_key: api_key,
      page: page,
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
};
