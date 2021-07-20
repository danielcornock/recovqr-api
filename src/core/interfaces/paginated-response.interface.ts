export interface PaginatedResponse<T> {
  count: number;
  data: Array<T>;
}