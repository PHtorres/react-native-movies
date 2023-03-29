import { useMemo } from 'react';
import { create } from 'zustand';
import { IFilters } from '../../interfaces/IFilters';
import { useGenresOptions } from './useGenresOptions';
import { useSortOption } from './useSortOption';
import { objectAsString } from '../../utils/object';
import { useYearOption } from './useYearOption';
import { useRuntimeOption } from './useRuntimeOption';

interface FiltersActions {
  filters: IFilters;
  setFilters(filters: IFilters): void;
}

export const useFilters = create<FiltersActions>(set => ({
  filters: {},
  setFilters: value => {
    set(() => ({ filters: value }));
  },
}));

export function useCurrentFilters() {
  const { filters, setFilters } = useFilters();
  const { sortOption } = useSortOption();
  const { selectedGenresIds } = useGenresOptions();
  const { selectedYear } = useYearOption();
  const { runtimeGte, runtimeLte } = useRuntimeOption();

  function updateCurrentFilters() {
    setFilters({
      sort_by: sortOption,
      with_genres: selectedGenresIds.join(', '),
      year: selectedYear,
      'with_runtime.gte': runtimeGte,
      'with_runtime.lte': runtimeLte,
    });
  }

  const filtersKey = useMemo(() => {
    return objectAsString(filters);
  }, [filters]);

  return {
    filters,
    filtersKey,
    updateCurrentFilters,
  };
}
