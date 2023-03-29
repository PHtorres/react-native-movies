import { Image, View } from 'react-native';
import { IMovie } from '../../interfaces/IMovie';
import { getImageUrl } from '../../utils/images';
import { FavoriteButton } from '../FavoriteButton';
import { styles } from './styles';

interface MoviePosterProps {
  movie: IMovie;
  posterWidth?: number;
}
export function MoviePoster({ movie, posterWidth }: MoviePosterProps) {
  const imageUrl = getImageUrl(movie.poster_path);
  const { container, favoriteButtonContainer, poster } = styles(posterWidth);
  return (
    <View style={container}>
      <View style={favoriteButtonContainer}>
        <FavoriteButton movie={movie} />
      </View>
      <Image style={poster} source={{ uri: imageUrl }} />
    </View>
  );
}
