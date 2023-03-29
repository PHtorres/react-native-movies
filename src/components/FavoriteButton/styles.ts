import { StyleSheet } from 'react-native';
import { colors } from '../../shared/styles';

const CONTAINER_WIDTH = 25;
const CONTAINER_HEIGHT = 25;

export const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONTAINER_WIDTH / 2,
  },
});
