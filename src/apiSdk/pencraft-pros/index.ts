import axios from 'axios';
import queryString from 'query-string';
import { PencraftProInterface } from 'interfaces/pencraft-pro';
import { GetQueryInterface } from '../../interfaces';

export const getPencraftPros = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pencraft-pros${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPencraftPro = async (pencraftPro: PencraftProInterface) => {
  const response = await axios.post('/api/pencraft-pros', pencraftPro);
  return response.data;
};

export const updatePencraftProById = async (id: string, pencraftPro: PencraftProInterface) => {
  const response = await axios.put(`/api/pencraft-pros/${id}`, pencraftPro);
  return response.data;
};

export const getPencraftProById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pencraft-pros/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePencraftProById = async (id: string) => {
  const response = await axios.delete(`/api/pencraft-pros/${id}`);
  return response.data;
};
