import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors, screenStyles, sizes, textStyles } from '../../shared/styles';
import { styles } from './style';
import { useSortOption } from '../../state/hooks/useSortOption';
import { useGenresOptions } from '../../state/hooks/useGenresOptions';
import { SORT_OPTIONS } from '../../constants/sortOptions';
import { useGenres } from '../../state/hooks/useGenres';
import { useCurrentFilters } from '../../state/hooks/useCurrentFilters';
import { useYearOption } from '../../state/hooks/useYearOption';
import { useRuntimeOption } from '../../state/hooks/useRuntimeOption';
import { memo } from 'react';
import { IS_IOS } from '../../utils/constants';
import { elementsIds } from '../../tests/elementsIds';

/**
 * To ensure that the keyboard will not be displayed over the form area
 */
const KEYBOARD_VERTICAL_OFFSET = 50;

export function Settings() {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();
  const { updateCurrentFilters } = useCurrentFilters();

  function handleSave() {
    updateCurrentFilters();
    goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      <View
        style={[
          screenStyles.container,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <ScrollView contentContainerStyle={styles.wrapper}>
          <SortBy />
          <Genres />
          <Year />
          <Runtime />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const SortBy = memo(() => {
  const { sortOption, setSortOption } = useSortOption();
  return (
    <View>
      <Text style={textStyles.h2}>Sort by</Text>
      <View>
        {SORT_OPTIONS.map(option => (
          <SortOption
            key={option.value}
            name={option.label}
            selected={sortOption === option.value}
            onSelect={() => setSortOption(option.value)}
          />
        ))}
      </View>
    </View>
  );
});

const Genres = memo(() => {
  const { genres } = useGenres();
  const { isGenreSelected, toggleSelectedGenre } = useGenresOptions();
  return (
    <View>
      <Text style={textStyles.h2}>Genres</Text>
      <View style={styles.genreList}>
        {genres.map(genre => (
          <Genre
            key={genre.id}
            name={genre.name}
            selected={isGenreSelected(genre.id)}
            onSelect={() => toggleSelectedGenre(genre.id)}
          />
        ))}
      </View>
    </View>
  );
});

const Year = memo(() => {
  const { selectedYear, setSelectedYear } = useYearOption();
  return (
    <View>
      <Text style={textStyles.h2}>Year</Text>
      <TextInput
        testID={elementsIds.yearInput}
        keyboardType="number-pad"
        style={styles.input}
        maxLength={4}
        value={selectedYear?.toString()}
        onChangeText={value => setSelectedYear(value ? Number(value) : undefined)}
        returnKeyType="done"
      />
    </View>
  );
});

const Runtime = memo(() => {
  const { runtimeGte, runtimeLte, setSelectedRuntimeGte, setSelectedRuntimeLte } =
    useRuntimeOption();
  return (
    <View>
      <Text style={textStyles.h2}>Runtime</Text>
      <View style={styles.runtime}>
        <TextInput
          testID={elementsIds.runtimeFromInput}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="From"
          placeholderTextColor={colors.neutral}
          maxLength={3}
          value={runtimeGte?.toString()}
          onChangeText={value => setSelectedRuntimeGte(value ? Number(value) : undefined)}
          returnKeyType="done"
        />
        <Text style={textStyles.small}>-</Text>
        <TextInput
          testID={elementsIds.runtimeToInput}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="To"
          placeholderTextColor={colors.neutral}
          maxLength={3}
          value={runtimeLte?.toString()}
          onChangeText={value => setSelectedRuntimeLte(value ? Number(value) : undefined)}
          returnKeyType="done"
        />
        <Text style={textStyles.small}>minutes</Text>
      </View>
    </View>
  );
});

interface OptionProps {
  name: string;
  selected: boolean;
  onSelect: () => void;
}

function Genre({ name, selected, onSelect }: OptionProps) {
  return (
    <TouchableOpacity
      testID={`genre-option-${name}-${selected ? 'selected' : ''}`}
      style={[styles.genre, selected ? styles.selectedGenre : undefined]}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={[selected ? styles.selectedGenreText : styles.optionLabel]}>{name}</Text>
      {selected && (
        <Icon
          testID={`genre-option-icon-${name}-selected`}
          name="close-outline"
          size={sizes.lg}
          color={colors.white}
        />
      )}
    </TouchableOpacity>
  );
}

function SortOption({ name, selected, onSelect }: OptionProps) {
  return (
    <TouchableOpacity
      testID={`sort-option-${name}-${selected ? 'selected' : ''}`}
      style={styles.sortOption}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={styles.optionLabel}>{name}</Text>
      <Icon
        testID={`sort-option-icon-${name}-${selected ? 'selected' : ''}`}
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={sizes.xxl}
        color={selected ? colors.primary : colors.black}
      />
    </TouchableOpacity>
  );
}
