import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const api_key = process.env.REACT_APP_API_KEY;

const getPopularTvShows = async (page) => {
  const response = await axios.get(BASE_URL + "/tv/popular", {
    params: {
      api_key: api_key,
      page: page,
    },
  });
  return response;
};

const getOnAirTvShows = async (page) => {
  const response = await axios.get(BASE_URL + "/tv/on_the_air", {
    params: {
      api_key: api_key,
      page: page,
    },
  });
  return response;
};

const getTvDetails = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id, {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

const getTvCredits = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id + "/credits", {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

const getEpisodeGroups = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id + "/episode_groups", {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

const getTvVideos = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id + "/videos", {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

const getTvImages = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id + "/images", {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

const getSimilarTv = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id + "/similar", {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

const getTvGenres = async () => {
  const response = await axios.get(BASE_URL + "/genre/tv/list", {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

export {
  getPopularTvShows,
  getOnAirTvShows,
  getTvDetails,
  getTvCredits,
  getEpisodeGroups,
  getTvVideos,
  getTvImages,
  getSimilarTv,
  getTvGenres,
};
