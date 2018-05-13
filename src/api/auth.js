import axios from 'axios';

export function authenticate(token) {
  return axios
    .get('/api/user/authenticate', { headers: { Authorization: token } })
    .then(resp => resp)
    .catch(e => e);
}

export function login(data) {
  return axios
    .post('/api/user/login', data)
    .then(resp => resp)
    .catch(e => e);
}

export function register(data) {
  return axios
    .post('/api/user/sign_up', data)
    .then(resp => resp)
    .catch(e => e);
}
