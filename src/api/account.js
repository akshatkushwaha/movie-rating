import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const getAccountDetails = async (session_id) => {
  const response = await axios.get(
    `${BASE_URL}/account?api_key=${api_key}&session_id=${session_id}`
  );
  return response.data;
};

export { getAccountDetails };
