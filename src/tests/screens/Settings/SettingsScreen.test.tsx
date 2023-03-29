import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import waait from 'waait';
import { Settings } from '../../../screens/Settings';
import { TestProvider } from '../TestProvider';
import { useSortOption } from '../../../state/hooks/useSortOption';
import { SORT_OPTIONS } from '../../../constants/sortOptions';
import { colors } from '../../../shared/styles';
import { successGenresData } from '../../mocks/genres';
import { useGenresOptions } from '../../../state/hooks/useGenresOptions';
import { elementsIds } from '../../elementsIds';
import { useYearOption } from '../../../state/hooks/useYearOption';
import { useRuntimeOption } from '../../../state/hooks/useRuntimeOption';
import { useCurrentFilters } from '../../../state/hooks/useCurrentFilters';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    return { goBack: mockedGoBack };
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => {
    return { bottom: 0 };
  },
}));

const renderSettingsScreen = () => {
  return render(<Settings />, {
    wrapper: TestProvider,
  });
};

describe('SettingsScreen::Options', () => {
  it('should render without crashing', async () => {
    const result = renderSettingsScreen();
    await waait(2000);
    expect(result).toMatchSnapshot();
  });

  it('should be able to select a sort option', async () => {
    const optionToBeSelected = SORT_OPTIONS[2];
    const { getByTestId, getByText } = renderSettingsScreen();
    await waait(2000);
    const { result } = renderHook(() => useSortOption());
    expect(result.current.sortOption).not.toBe(optionToBeSelected.value);
    const sortOptionPressableArea = getByText(optionToBeSelected.label);
    await act(async () => {
      fireEvent.press(sortOptionPressableArea);
    });
    const selectedOption = getByTestId(`sort-option-${optionToBeSelected.label}-selected`);
    const selectedOptionIcon = getByTestId(`sort-option-icon-${optionToBeSelected.label}-selected`);
    expect(result.current.sortOption).toBe(optionToBeSelected.value);
    expect(selectedOption).toBeTruthy();
    expect(selectedOptionIcon).toBeTruthy();
    expect(selectedOptionIcon.props.style[0].color).toBe(colors.primary);
  });

  it('should be able to select multiple genres', async () => {
    const optionToBeSelected1 = successGenresData.genres[0];
    const optionToBeSelected2 = successGenresData.genres[10];
    const notSelectedOption = successGenresData.genres[5];
    const { getByTestId, getByText, queryByTestId } = renderSettingsScreen();
    await waait(2000);
    const { result } = renderHook(() => useGenresOptions());
    expect(result.current.selectedGenresIds).not.toContain(optionToBeSelected1.id);
    expect(result.current.selectedGenresIds).not.toContain(optionToBeSelected2.id);
    expect(result.current.selectedGenresIds).not.toContain(notSelectedOption.id);
    const genreOptionPressableArea1 = getByText(optionToBeSelected1.name);
    const genreOptionPressableArea2 = getByText(optionToBeSelected2.name);
    await act(async () => {
      fireEvent.press(genreOptionPressableArea1);
    });
    await act(async () => {
      fireEvent.press(genreOptionPressableArea2);
    });

    expect(result.current.selectedGenresIds).toContain(optionToBeSelected1.id);
    expect(result.current.selectedGenresIds).toContain(optionToBeSelected2.id);
    expect(result.current.selectedGenresIds).not.toContain(notSelectedOption.id);

    const selectedOption1 = getByTestId(`genre-option-${optionToBeSelected1.name}-selected`);
    const selectedOption2 = getByTestId(`genre-option-${optionToBeSelected2.name}-selected`);
    const notSelected = getByTestId(`genre-option-${notSelectedOption.name}-`);
    const selectedOption1Icon = getByTestId(
      `genre-option-icon-${optionToBeSelected1.name}-selected`,
    );
    const selectedOption2Icon = getByTestId(
      `genre-option-icon-${optionToBeSelected2.name}-selected`,
    );
    const notSelectedIcon = queryByTestId(`genre-option-icon-${notSelectedOption.name}-selected`);

    expect(selectedOption1).toBeTruthy();
    expect(selectedOption2).toBeTruthy();
    expect(selectedOption1Icon).toBeTruthy();
    expect(selectedOption2Icon).toBeTruthy();

    expect(notSelected).toBeTruthy();
    expect(notSelectedIcon).toBeFalsy();

    expect(selectedOption1.props.style.backgroundColor).toBe(colors.primary);
    expect(selectedOption2.props.style.backgroundColor).toBe(colors.primary);

    expect(notSelected.props.style.backgroundColor).toBe(undefined);

    //unselect
    await act(async () => {
      fireEvent.press(genreOptionPressableArea1);
    });
    await act(async () => {
      fireEvent.press(genreOptionPressableArea2);
    });
  });

  it('should be able to add year option', async () => {
    const { getByTestId } = renderSettingsScreen();
    await waait(2000);
    const yearToBeAdded = '2021';
    fireEvent.changeText(getByTestId(elementsIds.yearInput), yearToBeAdded);

    const { result } = renderHook(() => useYearOption());
    expect(result.current.selectedYear).toBe(Number(yearToBeAdded));
  });

  it('should be able to add runtime range option', async () => {
    const { getByTestId } = renderSettingsScreen();
    await waait(2000);
    const fromValue = '90';
    const toValue = '115';
    fireEvent.changeText(getByTestId(elementsIds.runtimeFromInput), fromValue);
    fireEvent.changeText(getByTestId(elementsIds.runtimeToInput), toValue);

    const { result } = renderHook(() => useRuntimeOption());
    expect(result.current.runtimeGte).toBe(Number(fromValue));
    expect(result.current.runtimeLte).toBe(Number(toValue));
  });
});

describe('SettingsScreen::Save', () => {
  it('should be able to navigate to Discover screen and update filters when save button is pressed', async () => {
    const { getByText, getByTestId } = renderSettingsScreen();
    await waait(2000);

    //sort
    const sortOptionToBeSelected = SORT_OPTIONS[2];
    const sortOptionPressableArea = getByText(sortOptionToBeSelected.label);
    await act(async () => {
      fireEvent.press(sortOptionPressableArea);
    });

    //genres
    const genreOptionToBeSelected = successGenresData.genres[0];
    const genreOptionPressableArea = getByText(genreOptionToBeSelected.name);
    await act(async () => {
      fireEvent.press(genreOptionPressableArea);
    });

    //year
    const yearToBeAdded = '2021';
    fireEvent.changeText(getByTestId(elementsIds.yearInput), yearToBeAdded);

    //runtime
    const runtimeFromValue = '90';
    const runtimeToValue = '115';
    fireEvent.changeText(getByTestId(elementsIds.runtimeFromInput), runtimeFromValue);
    fireEvent.changeText(getByTestId(elementsIds.runtimeToInput), runtimeToValue);

    //save button
    const saveButton = getByText(/save/i);
    await act(async () => {
      fireEvent.press(saveButton);
    });
    const { result } = renderHook(() => useCurrentFilters());
    expect(result.current.filters).toStrictEqual({
      sort_by: sortOptionToBeSelected.value,
      with_genres: genreOptionToBeSelected.id.toString(),
      year: Number(yearToBeAdded),
      'with_runtime.gte': Number(runtimeFromValue),
      'with_runtime.lte': Number(runtimeToValue),
    });
    expect(mockedGoBack).toBeCalled();
  });
});
