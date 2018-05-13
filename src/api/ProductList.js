import axios from 'axios';

export function getProducts() {
  return axios
    .get('/api/products')
    .then(resp => resp)
    .catch(e => e);
}

export function filter(params) {
  return axios
    .get(`/api/products/filter${params}`)
    .then(resp => resp)
    .catch(e => e);
}
