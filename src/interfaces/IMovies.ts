import { IMovie } from './IMovie';

export interface IMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
