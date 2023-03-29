import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import EmptyState from '../../components/EmptyState';
import { MovieCardPortrait } from '../../components/MovieCardPortrait';
import {
  MOVIE_CARD_MARGIN_BOTTOM,
  MOVIE_CARD_HEIGHT,
} from '../../components/MovieCardPortrait/styles';
import { IMovie } from '../../interfaces/IMovie';
import { screenStyles } from '../../shared/styles';
import { useFavorites } from '../../state/hooks/useFavorites';
import { elementsIds } from '../../tests/elementsIds';

export function Favorites() {
  const { navigate } = useNavigation();
  const { favorites } = useFavorites();

  const renderFavoriteItem = useCallback(({ item }: ListRenderItemInfo<IMovie>) => {
    return <MovieCardPortrait movie={item} />;
  }, []);

  return (
    <View style={screenStyles.secondaryContainer}>
      <FlatList
        testID={elementsIds.favoriteList}
        data={favorites}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderFavoriteItem}
        ItemSeparatorComponent={() => <View style={{ height: MOVIE_CARD_MARGIN_BOTTOM }} />}
        ListEmptyComponent={() => (
          <EmptyState
            image={require('../../assets/empty-favorites.jpg')}
            title="You haven't liked any movie yet"
            message="Why not try to find a movie you like?"
            actionLabel="Go to Discover"
            onAction={() => navigate('Discover')}
          />
        )}
        //settings to improve performance
        removeClippedSubviews={true}
        maxToRenderPerBatch={1}
        initialNumToRender={6}
        getItemLayout={(_, index) => ({
          length: MOVIE_CARD_HEIGHT,
          offset: (MOVIE_CARD_HEIGHT + MOVIE_CARD_MARGIN_BOTTOM) * index,
          index,
        })}
      />
    </View>
  );
}
