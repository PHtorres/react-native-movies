import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, sizes } from '../shared/styles';
import { Discover } from '../screens/Discover';
import { Favorites } from '../screens/Favorites';
import { AppTabsParamList } from './navigation';
import { TouchableOpacity } from 'react-native';

const tabOptions = (props: {
  route: RouteProp<AppTabsParamList, keyof AppTabsParamList>;
  navigation: any;
}): BottomTabNavigationOptions => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.neutral,
  tabBarIcon: ({ focused, color }) => {
    let iconName = '';
    if (props.route.name === 'Discover') {
      if (focused) {
        iconName = 'compass';
      } else {
        iconName = 'compass-outline';
      }
    }
    if (props.route.name === 'Favorites') {
      if (focused) {
        iconName = 'heart';
      } else {
        iconName = 'heart-outline';
      }
    }
    return <Icon name={iconName} size={20} color={color} />;
  },
});

const Tab = createBottomTabNavigator<AppTabsParamList>();
export function AppTabs() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={props => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: sizes.xs }}
              onPress={() => props.navigation.navigate('Settings')}
            >
              <Icon name="options-outline" color={colors.black} size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}
