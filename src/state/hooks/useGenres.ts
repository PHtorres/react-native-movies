import { create } from 'zustand';
import { IGenre } from '../../interfaces/IGenre';

interface GenresActions {
  genres: IGenre[];
  setGenres(genres: IGenre[]): void;
}

export const useGenres = create<GenresActions>(set => ({
  genres: [],
  setGenres: value => {
    set(() => ({ genres: value }));
  },
}));
