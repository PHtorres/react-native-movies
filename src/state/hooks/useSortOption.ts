import { create } from 'zustand';
import { SORT_OPTIONS } from '../../constants/sortOptions';

interface SortOptionActions {
  sortOption: string;
  setSortOption(value: string): void;
}

export const useSortOption = create<SortOptionActions>(set => ({
  sortOption: SORT_OPTIONS[0].value,
  setSortOption: value => {
    set(() => ({ sortOption: value }));
  },
}));
