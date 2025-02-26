export interface ResponseWithPagination {
  data: ProductResponse | CategoryResponse;
  recordsFiltered: number;
}