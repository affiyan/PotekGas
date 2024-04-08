import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8083/'

export const listPembelians = () => axios.get(REST_API_BASE_URL + 'pembelian/getPembelians');
// export const listPembelians = () => axios.get(REST_API_BASE_URL + 'getPembelianActive');
// export const countAdmin = () => axios.get(REST_API_BASE_URL + 'countAdmin');
// export const countKasir = () => axios.get(REST_API_BASE_URL + 'countKasir');
export const getDetailPembelianById = (id) => axios.get(REST_API_BASE_URL + `detailPembelian/getDetailPembelians/${id}`);
export const getPembelianById = (id) => axios.get(REST_API_BASE_URL + `pembelian/getPembelian/${id}`);
// export const getPembelian = (id) => axios.post(REST_API_BASE_URL + 'getPembelian', id);
export const getPembelian = (id) => axios.get(`${REST_API_BASE_URL}pembelian/getPembelian?id=${id}`);
export const createPembelian = (Pembelian) => axios.post(REST_API_BASE_URL + 'pembelian/savePembelian', Pembelian)