import { create } from 'zustand';

interface YearOptionActions {
  selectedYear: number | undefined;
  setSelectedYear(value: number | undefined): void;
}

export const useYearOption = create<YearOptionActions>(set => ({
  selectedYear: undefined,
  setSelectedYear: value => {
    set(() => ({ selectedYear: value }));
  },
}));
