import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import waait from 'waait';
import { Favorites } from '../../../screens/Favorites';
import { TestProvider } from '../TestProvider';
import { successMoviesDataPage1 } from '../../mocks/movies';
import { elementsIds } from '../../elementsIds';
import { IMovie } from '../../../interfaces/IMovie';
import { useFavorites } from '../../../state/hooks/useFavorites';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    return { navigate: mockedNavigate };
  },
}));

const renderFavoritesScreen = () => {
  return render(<Favorites />, {
    wrapper: TestProvider,
  });
};

const mockedMovie1 = successMoviesDataPage1.results[0];
const mockedMovie2 = successMoviesDataPage1.results[1];
const mockedMovie3 = successMoviesDataPage1.results[3];

const mockedFavoriteList = [mockedMovie1, mockedMovie2, mockedMovie3];

describe('FavoritesScreen', () => {
  beforeAll(() => {
    const { result } = renderHook(() => useFavorites());
    result.current.toggleFavorite(mockedMovie3);
    result.current.toggleFavorite(mockedMovie2);
    result.current.toggleFavorite(mockedMovie1);
  });
  it('should render without crashing', async () => {
    const result = renderFavoritesScreen();
    await waait(2000);
    expect(result).toMatchSnapshot();
  });

  it('should render favorite movies list', async () => {
    const { getByTestId } = renderFavoritesScreen();
    await waait(2000);
    const listData = getByTestId(elementsIds.favoriteList).props.data as IMovie[];
    expect(listData).toEqual(mockedFavoriteList);
  });

  it('should be able to remove a movie from favorite list', async () => {
    const { getByTestId, queryByText } = renderFavoritesScreen();
    await waait(2000);
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toContain(mockedMovie1);
    const movieFavoriteButton = getByTestId(mockedMovie1.id.toString());
    await act(async () => {
      fireEvent.press(movieFavoriteButton);
    });
    const itemTitle = queryByText(mockedMovie1.original_title);
    expect(itemTitle).toBeFalsy();
    expect(result.current.favorites).not.toContain(mockedMovie1);

    //add again
    result.current.toggleFavorite(mockedMovie1);
    expect(result.current.favorites).toContain(mockedMovie1);
    const addedItemTitle = queryByText(mockedMovie1.original_title);
    expect(addedItemTitle).toBeTruthy();
  });

  it('should be able to navigate to Discover screen when there is no favorites', async () => {
    const { getByText } = renderFavoritesScreen();
    const { result } = renderHook(() => useFavorites());
    result.current.toggleFavorite(mockedMovie3);
    result.current.toggleFavorite(mockedMovie2);
    result.current.toggleFavorite(mockedMovie1);

    await waait(2000);
    const discoverButton = getByText('Go to Discover');
    await act(async () => {
      fireEvent.press(discoverButton);
    });

    expect(mockedNavigate).toBeCalledWith('Discover');
  });
});
