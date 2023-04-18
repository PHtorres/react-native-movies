import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { genres } from '../api/requests/genres';
import { requestsKeys } from '../api/requests/shared/keys';
import { useGenres } from '../state/hooks/useGenres';
import { useLoading } from '../state/hooks/useLoading';

export function GenresProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useQuery({
    queryKey: requestsKeys.genre_movie_list,
    queryFn: genres.getGenreMovieList,
  });

  const { closeLoading } = useLoading();
  const { setGenres } = useGenres();

  useEffect(() => {
    if (!isLoading) {
      closeLoading();
    }
  }, [isLoading]);

  useEffect(() => {
    data?.data && setGenres(data.data.genres);
  }, [data]);

  return <>{children}</>;
}
