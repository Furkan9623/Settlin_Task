import axios from "axios";
const URL = "https://settlin-task.onrender.com";
const registerUserApi = async (data) => {
  console.log(data);
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios
    .post(`${URL}/api/v1/user/register`, data, config)
    .then((res) => res)
    .catch((er) => er);
};

// login user
const loginUserApi = async (data) => {
  return axios
    .post(`${URL}/api/v1/user/login`, data)
    .then((res) => res)
    .catch((er) => er);
};

export { registerUserApi, loginUserApi };
