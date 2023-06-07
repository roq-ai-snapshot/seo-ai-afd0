import axios from 'axios';
import queryString from 'query-string';
import { KeywordInterface } from 'interfaces/keyword';
import { GetQueryInterface } from '../../interfaces';

export const getKeywords = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/keywords${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createKeyword = async (keyword: KeywordInterface) => {
  const response = await axios.post('/api/keywords', keyword);
  return response.data;
};

export const updateKeywordById = async (id: string, keyword: KeywordInterface) => {
  const response = await axios.put(`/api/keywords/${id}`, keyword);
  return response.data;
};

export const getKeywordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/keywords/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteKeywordById = async (id: string) => {
  const response = await axios.delete(`/api/keywords/${id}`);
  return response.data;
};
