export interface PaginationData {
  page?: number;
  size?: number;
  sort?: `${string},${SortDirection}`;
}

type SortDirection = 'asc' | 'desc';
