import { useGenres } from '../state/hooks/useGenres';

export function useGenresNamesByIds(ids: number[]) {
  const { genres } = useGenres();
  const genresNames = genres
    .filter(genre => ids.includes(genre.id))
    .map(genre => genre.name)
    .join(', ');
  return { genresNames };
}
