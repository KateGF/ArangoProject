// my-react-app/src/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});


// Comments related endpoints
export const getComments = (idPost) => api.get(`/posts/${idPost}/comments`);
export const createComment = (idPost, comment) => api.post(`/posts/${idPost}/comments`, comment);
export const updateComment = (id, comment) => api.put(`/comments/${id}`, comment);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

// Posts related endpoints
export const getPosts = () => api.get('/posts');
export const createPost = (post) => api.post('/posts', post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);


// Usuarios
export const getUsers = () => api.get('/users');
export const getUser = (id, user) => api.get(`/users${id}`, user);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

