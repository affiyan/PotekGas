import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8083/users/'

// export const listUsers = () => axios.get(REST_API_BASE_URL + 'getUsers');
export const listUsers = () => axios.get(REST_API_BASE_URL + 'getUserActive');
export const getUserById = (id) => axios.get(REST_API_BASE_URL + `getUser/${id}`);
export const createUser = (user) => axios.post(REST_API_BASE_URL + 'saveUser', user)
export const updateUser = (user) => axios.post(REST_API_BASE_URL + 'updateUser', user)
export const deleteUser = (user) => axios.post(REST_API_BASE_URL + 'deleteUser', user)