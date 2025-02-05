import { create } from "zustand";

export interface PaginationState {
  page: number;
  length: number;
  field: string;
  order: string;
  search: string;
  setPage: (page: number) => void;
  setLength: (length: number) => void;
  setField: (field: string) => void;
  setOrder: (oder: string) => void;
  setSearch: (search: string) => void;
}

export const useSearchSortPaginationStore = create<PaginationState>((set) => ({
  page: 1,
  length: 10,
  field: 'id',
  order: 'asc',
  search: '',
  setPage: (page) => set({ page }),
  setLength: (length) => set({ length }),
  setField: (field) => set({ field }),
  setOrder: (order) => set({ order }),
  setSearch: (search) => set({ search }),
}));
