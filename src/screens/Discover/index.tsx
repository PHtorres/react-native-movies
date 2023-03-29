import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import EmptyState from '../../components/EmptyState';
import { colors, screenStyles } from '../../shared/styles';
import { MovieCardLandscape } from '../../components/MovieCardLandscape';
import { requestsKeys } from '../../api/requests/shared/keys';
import { discoverRequests } from '../../api/requests/discover';
import { useMoviesInfinityQueryParsedData } from '../../hooks/useMoviesInfinityQueryParsedData';
import { MOVIE_CARD_HEIGHT, MOVIE_CARD_MARGIN } from '../../components/MovieCardLandscape/styles';
import { useCurrentFilters } from '../../state/hooks/useCurrentFilters';
import { elementsIds } from '../../tests/elementsIds';

export function Discover() {
  const { navigate } = useNavigation();
  const { filters, filtersKey } = useCurrentFilters();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    keepPreviousData: true,
    queryKey: requestsKeys.discover_movie(filtersKey),
    queryFn: ({ pageParam = 1 }) => discoverRequests.getMovies(pageParam, filters),
    getNextPageParam: (lastPage, _) => {
      return lastPage.data?.page < lastPage.data?.total_pages ? lastPage.data?.page + 1 : undefined;
    },
  });

  const { parsedData } = useMoviesInfinityQueryParsedData(data?.pages);

  const loadMore = async () => {
    hasNextPage && (await fetchNextPage());
  };

  return (
    <View style={screenStyles.container}>
      <FlashList
        testID={elementsIds.discoverList}
        data={parsedData}
        renderItem={({ item }) => <MovieCardLandscape movie={item} />}
        estimatedItemSize={MOVIE_CARD_HEIGHT}
        alwaysBounceVertical={true}
        ItemSeparatorComponent={() => <View style={{ height: MOVIE_CARD_MARGIN }} />}
        ListEmptyComponent={() => (
          <EmptyState
            image={require('../../assets/empty-discover.jpg')}
            title="No results found"
            message="Try adjusting the settings"
            actionLabel="Go to Settings"
            onAction={() => navigate('Settings')}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator color={colors.primary} size="large" /> : null
        }
      />
    </View>
  );
}
