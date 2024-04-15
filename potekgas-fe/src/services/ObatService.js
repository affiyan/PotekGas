import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8083/obats/'

// export const listObats = () => axios.get(REST_API_BASE_URL + 'getObats');
export const listObats = () => axios.get(REST_API_BASE_URL + 'getObatActive');
export const countObat = () => axios.get(REST_API_BASE_URL + 'countObat');
export const getObatById = (id) => axios.get(REST_API_BASE_URL + `getObat/${id}`);
export const createObat = (obat, param) => axios.post(REST_API_BASE_URL + 'saveObat', obat, { params: param });
export const updateObat = (obat, param) => axios.post(REST_API_BASE_URL + 'updateObat', obat, { params: param });
export const deleteObat = (obat) => axios.post(REST_API_BASE_URL + 'deleteObat', obat)