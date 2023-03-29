import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import waait from 'waait';
import { Discover } from '../../../screens/Discover';
import { TestProvider } from '../TestProvider';
import { discoverRequests } from '../../../api/requests/discover';
import {
  noResultsMoviesRequest,
  successMoviesDataPage1,
  successMoviesDataPage2,
  successMoviesRequestPage1,
  successMoviesRequestPage2,
} from '../../mocks/movies';
import { elementsIds } from '../../elementsIds';
import { IMovie } from '../../../interfaces/IMovie';
import {
  MOVIE_CARD_HEIGHT,
  MOVIE_CARD_MARGIN,
} from '../../../components/MovieCardLandscape/styles';
import { SCREEN_HEIGHT } from '../../../utils/constants';
import { useFavorites } from '../../../state/hooks/useFavorites';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    return { navigate: mockedNavigate };
  },
}));

const renderDiscoverScreen = () => {
  return render(<Discover />, {
    wrapper: TestProvider,
  });
};

beforeAll(() => {
  jest.spyOn(discoverRequests, 'getMovies').mockImplementation(async page => {
    if (page == 1) return successMoviesRequestPage1;
    return successMoviesRequestPage2;
  });
});

describe('DiscoverScreen', () => {
  it('should render without crashing', async () => {
    const result = renderDiscoverScreen();
    await waait(2000);
    expect(result).toMatchSnapshot();
  });

  it('should render first page list data', async () => {
    const { getByTestId } = renderDiscoverScreen();
    await waait(2000);
    const listData = getByTestId(elementsIds.discoverList).props.data as IMovie[];
    expect(listData).toEqual(successMoviesDataPage1.results);
  });

  it('should render second page list data after scroll to the end of the current list', async () => {
    const { getByTestId } = renderDiscoverScreen();
    await waait(2000);
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: (MOVIE_CARD_HEIGHT + MOVIE_CARD_MARGIN) * 20,
        },
        contentSize: {
          height: MOVIE_CARD_HEIGHT,
        },
        layoutMeasurement: {
          height: SCREEN_HEIGHT,
        },
      },
    };

    await act(async () => {
      fireEvent.scroll(getByTestId(elementsIds.discoverList), eventData);
    });
    await waait(2000);
    const listData = getByTestId(elementsIds.discoverList).props.data as IMovie[];
    const allPagesData = [...successMoviesDataPage1.results, ...successMoviesDataPage2.results];
    expect(listData).toEqual(allPagesData);
  });

  it('should be able to add a movie in favorite list', async () => {
    const { getByTestId } = renderDiscoverScreen();
    await waait(2000);
    const movie = successMoviesDataPage1.results[0];
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).not.toContain(movie);
    const movieFavoriteButton = getByTestId(movie.id.toString());
    await act(async () => {
      fireEvent.press(movieFavoriteButton);
    });
    expect(result.current.favorites).toContain(movie);
  });

  it('should be able to navigate to settings when request has no results', async () => {
    jest.spyOn(discoverRequests, 'getMovies').mockImplementation(async _ => noResultsMoviesRequest);
    const { getByText } = renderDiscoverScreen();
    await waait(2000);
    const settingsButton = getByText('Go to Settings');
    await act(async () => {
      fireEvent.press(settingsButton);
    });

    expect(mockedNavigate).toBeCalledWith('Settings');
  });
});
