import { StyleSheet } from 'react-native';
import { colors } from '../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
