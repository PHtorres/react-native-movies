import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../shared/styles';
import { styles } from './styles';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};
