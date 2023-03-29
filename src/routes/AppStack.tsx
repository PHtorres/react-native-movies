import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, sizes } from '../shared/styles';
import { AppTabs } from './AppTabs';
import { Settings } from '../screens/Settings';
import { AppStackParamList } from './navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

const stackOptions = (props: {
  route: RouteProp<AppStackParamList, keyof AppStackParamList>;
  navigation: any;
}): NativeStackNavigationOptions => ({
  headerBackVisible: false,
  headerLeft: ({ canGoBack }) => {
    if (!canGoBack) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
        <Icon name="chevron-back" size={sizes.xxl} color={colors.black} />
      </TouchableOpacity>
    );
  },
});

export function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
