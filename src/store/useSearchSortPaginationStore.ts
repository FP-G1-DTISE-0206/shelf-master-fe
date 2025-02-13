import { create } from "zustand";

export interface SearchSortPaginationState {
  page: number;
  length: number;
  field: string;
  order: string;
  search: string;
  filters: number[];
  setPage: (page: number) => void;
  setLength: (length: number) => void;
  setField: (field: string) => void;
  setOrder: (oder: string) => void;
  setSearch: (search: string) => void;
  setFilters: (filters: number[]) => void;
}

export const useSearchSortPaginationStore = create<SearchSortPaginationState>((set) => ({
  page: 1,
  length: 10,
  field: 'id',
  order: 'asc',
  search: '',
  filters: [],
  setPage: (page) => set({ page }),
  setLength: (length) => set({ length }),
  setField: (field) => set({ field }),
  setOrder: (order) => set({ order }),
  setSearch: (search) => set({ search }),
  setFilters: (filters) => set({ filters }), 
}));
