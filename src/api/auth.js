import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const getRequestToken = async () => {
  const response = await axios.get(
    `${BASE_URL}/authentication/token/new?api_key=${api_key}`
  );
  return response;
};

const createSession = async (request_token) => {
  const response = await axios.post(
    `${BASE_URL}/authentication/session/new?api_key=${api_key}`,
    { request_token }
  );
  return response;
};

const createSessionWithLogin = async (username, password, request_token) => {
  const response = await axios.post(
    `${BASE_URL}/authentication/token/validate_with_login?api_key=${api_key}`,
    {
      username,
      password,
      request_token,
    }
  );
  return response;
};

export { getRequestToken, createSession, createSessionWithLogin };
