import { StyleSheet } from 'react-native';
import { sizes } from '../../shared/styles';

const MOVIE_POSTER_WIDTH = 110;

export const styles = (posterWidth?: number) =>
  StyleSheet.create({
    container: {},
    favoriteButtonContainer: {
      position: 'absolute',
      right: 5,
      top: 5,
      zIndex: 999,
    },
    poster: {
      width: posterWidth ?? MOVIE_POSTER_WIDTH,
      height: '100%',
      borderRadius: sizes.xs,
    },
  });
