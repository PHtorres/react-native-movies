import { Text, View } from 'react-native';
import { IMovie } from '../../interfaces/IMovie';
import { textStyles } from '../../shared/styles';
import { MoviePoster } from '../MoviePoster';
import { MOVIE_CARD_WIDTH, styles } from './styles';

interface MovieCardPortraitProps {
  movie: IMovie;
}
export function MovieCardPortrait({ movie }: MovieCardPortraitProps) {
  return (
    <View style={styles.container}>
      <View style={styles.poster}>
        <MoviePoster movie={movie} posterWidth={MOVIE_CARD_WIDTH} />
      </View>
      <Text style={textStyles.h4}>{movie.original_title}</Text>
    </View>
  );
}
