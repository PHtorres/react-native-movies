import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { genres } from '../src/api/requests/genres';
import { successGenresRequest } from '../src/tests/mocks/genres';
require("@shopify/flash-list/jestSetup");

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    return { navigate: jest.fn(), goBack: jest.fn() };
  },
  createNavigatorFactory: jest.fn(),
}));

jest.spyOn(genres, 'getGenreMovieList').mockResolvedValueOnce(successGenresRequest);
