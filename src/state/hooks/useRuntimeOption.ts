import { create } from 'zustand';

interface RuntimeOptionActions {
  runtimeGte: number | undefined;
  runtimeLte: number | undefined;
  setSelectedRuntimeGte(value: number | undefined): void;
  setSelectedRuntimeLte(value: number | undefined): void;
}

export const useRuntimeOption = create<RuntimeOptionActions>(set => ({
  runtimeGte: undefined,
  runtimeLte: undefined,
  setSelectedRuntimeGte: value => {
    set(() => ({ runtimeGte: value }));
  },
  setSelectedRuntimeLte: value => {
    set(() => ({ runtimeLte: value }));
  },
}));
