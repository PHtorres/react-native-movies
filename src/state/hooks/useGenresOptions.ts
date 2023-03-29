import { create } from 'zustand';

interface GenresOptionsActions {
  selectedGenresIds: number[];
  toggleSelectedGenre: (genreId: number) => void;
  isGenreSelected: (genreId: number) => boolean;
}

function removeSelectedGenre(selectedGenreIds: number[], genreId: number) {
  const newSelectedGenreIds = selectedGenreIds.filter(id => id !== genreId);
  return newSelectedGenreIds;
}

function addSelectedGenre(selectedGenreIds: number[], genreId: number) {
  selectedGenreIds.unshift(genreId);
  return selectedGenreIds;
}

function toggleSelectedGenre(selectedGenreIds: number[], genreId: number) {
  if (isGenreSelected(selectedGenreIds, genreId)) {
    return removeSelectedGenre(selectedGenreIds, genreId);
  }
  return addSelectedGenre(selectedGenreIds, genreId);
}

function isGenreSelected(selectedGenreIds: number[], genreId: number) {
  const result = selectedGenreIds.find(id => id == genreId);
  return !!result;
}

export const useGenresOptions = create<GenresOptionsActions>((set, props) => ({
  selectedGenresIds: [],
  toggleSelectedGenre: genreId =>
    set({ selectedGenresIds: toggleSelectedGenre(props().selectedGenresIds, genreId) }),
  isGenreSelected: genreId => isGenreSelected(props().selectedGenresIds, genreId),
}));
