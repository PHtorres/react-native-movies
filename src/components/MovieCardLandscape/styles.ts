import { StyleSheet } from 'react-native';
import { sizes } from '../../shared/styles';

export const MOVIE_CARD_HEIGHT = 170;
export const MOVIE_CARD_MARGIN = sizes.xs;

export const styles = StyleSheet.create({
  container: {
    height: MOVIE_CARD_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: sizes.xs,
  },
  infos: {
    marginTop: sizes.xs,
    flex: 1,
    gap: sizes.xs,
    alignItems: 'flex-start',
  },
});
