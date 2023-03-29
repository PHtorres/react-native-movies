import { create } from 'zustand';

const CLOSE_LOADING_TIME_OUT = 1000;

interface LoadingActions {
  isVisible: boolean;
  showLoading(): void;
  closeLoading(): void;
}

export const useLoading = create<LoadingActions>(set => ({
  isVisible: true,
  showLoading: () => {
    set(() => ({ isVisible: true }));
  },
  closeLoading: () => {
    setTimeout(() => {
      {
        set(() => {
          return { isVisible: false };
        });
      }
    }, CLOSE_LOADING_TIME_OUT);
  },
}));
