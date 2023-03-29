import { Text, View } from 'react-native';
import { useGenresNamesByIds } from '../../hooks/useGenresNamesByIds';
import { IMovie } from '../../interfaces/IMovie';
import { textStyles } from '../../shared/styles';
import { parseDate } from '../../utils/date';
import { MoviePoster } from '../MoviePoster';
import { StarRating } from '../StarRating';
import { styles } from './styles';

interface MovieCardLandscapeProps {
  movie: IMovie;
}
export function MovieCardLandscape({ movie }: MovieCardLandscapeProps) {
  const { genresNames } = useGenresNamesByIds(movie.genre_ids);
  const releaseYear = parseDate(movie.release_date)?.getFullYear();
  return (
    <View style={styles.container}>
      <MoviePoster movie={movie} />
      <View style={styles.infos}>
        <Text style={textStyles.h4}>{movie.original_title}</Text>
        <StarRating rating={movie.vote_average} />
        {genresNames && <Text style={textStyles.small}>{genresNames}</Text>}
        {releaseYear && <Text style={textStyles.small}>{releaseYear}</Text>}
      </View>
    </View>
  );
}
