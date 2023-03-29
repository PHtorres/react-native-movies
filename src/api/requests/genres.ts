import { api } from '..';
import { IGenres } from '../../interfaces/IGenres';
import { API_ENDPOINTS } from './shared/endpoints';

async function getGenreMovieList() {
  const response = await api.get<IGenres>(API_ENDPOINTS.genre_movie_list);
  return response;
}

export const genres = {
  getGenreMovieList,
};
