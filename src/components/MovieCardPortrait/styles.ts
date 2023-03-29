import { StyleSheet } from 'react-native';
import { sizes } from '../../shared/styles';
import { SCREEN_WIDTH } from '../../utils/constants';

const SCREEN_PADDING = 0;
const AVAILABLE_WIDTH_SIZE = SCREEN_WIDTH - SCREEN_PADDING;
export const MOVIE_CARD_WIDTH = AVAILABLE_WIDTH_SIZE * 0.47;
export const MOVIE_CARD_MARGIN_HORIZONTAL = AVAILABLE_WIDTH_SIZE * 0.06;
const MOVIE_POSTER_HEIGHT = MOVIE_CARD_WIDTH * 1.5;
export const MOVIE_CARD_HEIGHT = MOVIE_POSTER_HEIGHT + MOVIE_POSTER_HEIGHT * 0.2;
export const MOVIE_CARD_MARGIN_BOTTOM = sizes.xs;

export const styles = StyleSheet.create({
  container: {
    height: MOVIE_CARD_HEIGHT,
    width:MOVIE_CARD_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: sizes.xs,
    marginHorizontal:MOVIE_CARD_MARGIN_HORIZONTAL / 4
  },
  poster: {
    height: MOVIE_POSTER_HEIGHT,
  },
  infos: {
    marginTop: sizes.xs,
    flex: 1,
    gap: sizes.xs,
    alignItems: 'flex-start',
  },
});
