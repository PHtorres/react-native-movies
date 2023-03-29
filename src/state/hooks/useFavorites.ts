import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IMovie } from '../../interfaces/IMovie';

interface IFavoritesActions {
  favorites: IMovie[];
  toggleFavorite: (favorite: IMovie) => void;
  isFavorite: (id: number) => boolean;
}

function removeFavorite(favorites: IMovie[], favorite: IMovie) {
  const newFavorites = favorites.filter(f => f.id !== favorite.id);
  return newFavorites;
}

function addFavorite(favorites: IMovie[], favorite: IMovie) {
  favorites.unshift(favorite);
  return favorites;
}

function toggleFavorite(favorites: IMovie[], favorite: IMovie) {
  if(isFavorite(favorites, favorite.id)){
    return removeFavorite(favorites, favorite);
  }
  return addFavorite(favorites, favorite);
}

function isFavorite(favorites: IMovie[], id: number) {
  const result = favorites.find(f => f.id == id);
  return !!result;
}

export const useFavorites = create<IFavoritesActions>()(
  persist(
    (set, props) => ({
      favorites: [],
      toggleFavorite: favorite => set({ favorites: toggleFavorite(props().favorites, favorite) }),
      isFavorite: id => isFavorite(props().favorites, id),
    }),
    {
      name: 'MoviesOnTheGo@Favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
