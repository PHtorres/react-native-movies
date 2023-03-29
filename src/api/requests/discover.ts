import { api } from '..';
import { IFilters } from '../../interfaces/IFilters';
import { IMovies } from '../../interfaces/IMovies';
import { API_ENDPOINTS } from './shared/endpoints';

async function getMovies(page: number, filters: IFilters) {
  const response = await api.get<IMovies>(API_ENDPOINTS.discover_movie, {
    params: {
      page,
      ...filters,
    },
  });

  return response;
}

export const discoverRequests = {
  getMovies,
};
