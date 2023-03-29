import axios from 'axios';
import { TMDB_API_URL, TMDB_API_KEY } from 'react-native-dotenv';

export const api = axios.create({
  baseURL: TMDB_API_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
