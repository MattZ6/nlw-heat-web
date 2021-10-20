import axios from 'axios';

export const nlwHeatApi = axios.create({
  baseURL: 'http://localhost:3333'
});
