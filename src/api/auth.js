import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const fetchProfile = async () => {
  console.log("fetching Profile");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await axios.get(BASE_URL + "profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const postLogin = async (email, password) => {
  const response = await axios.post(BASE_URL + "login", {
    email,
    password,
  });
  return response.data;
};

const postRegister = async (name, email, password) => {
  const response = await axios.post(BASE_URL + "register", {
    name,
    email,
    password,
    c_password: password,
  });
  return response.data;
};

const postLogout = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await axios.post(
    BASE_URL + "logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const postResetPassword = async (email) => {
  const response = await axios.post(BASE_URL + "password/reset", {
    email,
  });
  return response.data;
};

const postChangePassword = async (password, password_confirmation) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await axios.post(
    BASE_URL + "password/change",
    {
      password,
      password_confirmation,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default {
  fetchProfile,
  postLogin,
  postRegister,
  postLogout,
  postResetPassword,
  postChangePassword,
};
