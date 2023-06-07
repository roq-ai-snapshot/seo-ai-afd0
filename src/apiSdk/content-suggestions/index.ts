import axios from 'axios';
import queryString from 'query-string';
import { ContentSuggestionInterface } from 'interfaces/content-suggestion';
import { GetQueryInterface } from '../../interfaces';

export const getContentSuggestions = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/content-suggestions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createContentSuggestion = async (contentSuggestion: ContentSuggestionInterface) => {
  const response = await axios.post('/api/content-suggestions', contentSuggestion);
  return response.data;
};

export const updateContentSuggestionById = async (id: string, contentSuggestion: ContentSuggestionInterface) => {
  const response = await axios.put(`/api/content-suggestions/${id}`, contentSuggestion);
  return response.data;
};

export const getContentSuggestionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/content-suggestions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContentSuggestionById = async (id: string) => {
  const response = await axios.delete(`/api/content-suggestions/${id}`);
  return response.data;
};
