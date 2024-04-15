import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8083/users/'

// export const listUsers = () => axios.get(REST_API_BASE_URL + 'getUsers');
export const listUsers = () => axios.get(REST_API_BASE_URL + 'getUserActive');
export const countAdmin = () => axios.get(REST_API_BASE_URL + 'countAdmin');
export const countKasir = () => axios.get(REST_API_BASE_URL + 'countKasir');
export const getUserById = (id) => axios.get(REST_API_BASE_URL + `getUser/${id}`);
export const getUser = (id) => axios.get(`${REST_API_BASE_URL}getUser?id=${id}`);
export const createUser = (user, param) => axios.post(REST_API_BASE_URL + 'saveUser', user, { params: param });
export const updateUser = (user, param) => axios.post(REST_API_BASE_URL + 'updateUser', user, { params: param });
export const deleteUser = (user) => axios.post(REST_API_BASE_URL + 'deleteUser', user)
export const login = (user) => axios.post(REST_API_BASE_URL + 'login', user)