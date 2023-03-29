import { Dimensions, Platform, StatusBar } from 'react-native';

function getScreenHeight(): number {
  if (IS_IOS) return Dimensions.get('window').height;

  return Dimensions.get('screen').height !== Dimensions.get('window').height &&
    (StatusBar.currentHeight || 0) > 24
    ? Dimensions.get('screen').height - (StatusBar.currentHeight || 0)
    : Dimensions.get('window').height;
}

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = getScreenHeight();
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
