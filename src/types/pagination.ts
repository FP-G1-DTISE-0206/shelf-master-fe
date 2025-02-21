export interface PaginationRequest {
  start: number;
  length: number;
  search: string;
  field: string;
  order: string;
}

export interface PaginationResponse<T> {
  recordsFiltered: number;
  data: T[];
}
