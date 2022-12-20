import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const api_key = process.env.REACT_APP_API_KEY;

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

export { getTvDetails, getTvCredits, getEpisodeGroups };
