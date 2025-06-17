import axios from 'axios';

const API_URL = 'http://localhost:8080/services'; // cambiar según entorno

export const getServices = () => axios.get(API_URL);

export const createService = (service) => axios.post(API_URL, service);

export const updateService = (id, service) => axios.put(`${API_URL}/${id}`, service);

export const deleteService = (id) => axios.delete(`${API_URL}/${id}`);
