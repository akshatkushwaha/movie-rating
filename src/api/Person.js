import axios from "axios";

const api_key = "48d198c2c635e2c64caa41df6e4acda6";

const BASE_URL = "https://api.themoviedb.org/3";

const getPersonDetails = async (id) =>
  await axios.get(BASE_URL + "/person/" + id, {
    params: {
      api_key: api_key,
    },
  });

const getPersonMovieCredits = async (id) =>
  await axios.get(BASE_URL + "/person/" + id + "/movie_credits", {
    params: {
      api_key: api_key,
    },
  });

const getPersonCombinedCredits = async (id) =>
  await axios.get(BASE_URL + "/person/" + id + "/combined_credits", {
    params: {
      api_key: api_key,
    },
  });

const getPersonExternalIds = async (id) =>
  await axios.get(BASE_URL + "/person/" + id + "/external_ids", {
    params: {
      api_key: api_key,
    },
  });

const getPersonImages = async (id) =>
  await axios.get(BASE_URL + "/person/" + id + "/images", {
    params: {
      api_key: api_key,
    },
  });

const getPersonTaggedImages = async (id) =>
  await axios.get(BASE_URL + "/person/" + id + "/tagged_images", {
    params: {
      api_key: api_key,
    },
  });

export {
  getPersonDetails,
  getPersonMovieCredits,
  getPersonCombinedCredits,
  getPersonExternalIds,
  getPersonImages,
  getPersonTaggedImages,
};
