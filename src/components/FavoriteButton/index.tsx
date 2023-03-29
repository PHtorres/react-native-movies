import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFavorites } from '../../state/hooks/useFavorites';
import { IMovie } from '../../interfaces/IMovie';
import { colors } from '../../shared/styles';
import { styles } from './styles';

interface FavoriteButtonProps {
  movie: IMovie;
}

export function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFavoritedMovie = isFavorite(movie.id);

  function handleFavoritePressed() {
    toggleFavorite(movie);
  }

  return (
    <TouchableOpacity
      testID={movie.id.toString()}
      style={styles.container}
      onPress={handleFavoritePressed}
    >
      <Ionicons
        name={isFavoritedMovie ? 'heart' : 'heart-outline'}
        color={isFavoritedMovie ? colors.primary : colors.black}
        size={16}
      />
    </TouchableOpacity>
  );
}
