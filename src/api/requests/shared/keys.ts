import { QueryKey } from '@tanstack/react-query';

const REQUEST_KEY_PREFIX = 'MoviesOnTheGo-';

const createRequestKey = (key: string, id?: string): QueryKey => {
  return [`${REQUEST_KEY_PREFIX}${key}`, id];
};

export const requestsKeys = {
  genre_movie_list: createRequestKey('genre-movie-list'),
  discover_movie: (id: string) => createRequestKey('discover-movie', id),
};
