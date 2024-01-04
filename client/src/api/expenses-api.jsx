import axios from "axios";

// const URL = "http://localhost:8080";
const URL = "https://settlin-task.onrender.com";
const addExpenses = async (data) => {
  return axios
    .post(`${URL}/api/v1/expense/add`, data)
    .then((res) => res)
    .catch((er) => er);
};
const getAllEntries = async (data) => {
  return axios
    .get(`${URL}/api/v1/expense/all-entry`)
    .then((res) => res)
    .catch((er) => er);
};
const deleteExpense = async (id) => {
  return axios
    .delete(`${URL}/api/v1/expense/delete-entry/${id}`)
    .then((res) => res)
    .catch((er) => er);
};

const singleEntrie = async (id) => {
  return axios
    .get(`${URL}/api/v1/expense/single-entry/${id}`)
    .then((res) => res)
    .catch((er) => er);
};

export { addExpenses, getAllEntries, deleteExpense, singleEntrie };
