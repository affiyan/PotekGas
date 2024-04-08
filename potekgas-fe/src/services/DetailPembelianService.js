import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8083/'

export const listDetails = () => axios.get(REST_API_BASE_URL + 'detailPembelian/getDetailPembelians');
export const getDetailById = (id) => axios.get(REST_API_BASE_URL + `detailPembelian/getDetailPembelians/${id}`);

