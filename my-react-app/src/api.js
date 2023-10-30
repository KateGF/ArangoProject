// my-react-app/src/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/data',
});

export const getComments = () => api.get('/');
export const createComment = (comment) => api.post('/', comment);
export const updateComment = (id, comment) => api.put(`/${id}`, comment);
export const deleteComment = (id) => api.delete(`/${id}`);


// Usuarios
export const getUsers = () => api.get('/users');
export const getUser = (id, user) => api.get(`/users${id}`, user);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);