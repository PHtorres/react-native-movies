export interface IFilters {
  with_genres?: string;
  sort_by?: string;
  year?: number;
  ["with_runtime.gte"]?: number;
  ["with_runtime.lte"]?: number;
}
