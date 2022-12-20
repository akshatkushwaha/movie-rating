import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const api_key = "48d198c2c635e2c64caa41df6e4acda6";

const getTvDetails = async (id) => {
  const response = await axios.get(BASE_URL + "/tv/" + id, {
    params: {
      api_key: api_key,
    },
  });
  return response;
};

export { getTvDetails };
