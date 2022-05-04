import axios from 'axios';

export const nlwHeatApi = axios.create({
  baseURL: String(import.meta.env.VITE_API_URL),
});
