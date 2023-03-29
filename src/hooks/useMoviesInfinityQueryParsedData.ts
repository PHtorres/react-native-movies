import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { IMovies } from '../interfaces/IMovies';
import { IMovie } from '../interfaces/IMovie';

export function useMoviesInfinityQueryParsedData(pages: AxiosResponse<IMovies>[] | undefined) {
  const parsedData = useMemo(() => {
    let resultList: IMovie[] = [];
    pages?.forEach(page => {
      resultList = resultList.concat(page.data!.results);
    });
    return resultList;
  }, [pages]);

  return {
    parsedData,
  };
}
