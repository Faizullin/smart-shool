export interface IDataResponse<T> {
  results: T[];
  count: number;
  previous?: any;
  next?: any;
}
