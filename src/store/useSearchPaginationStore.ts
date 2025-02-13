import { create } from "zustand";

export interface SearchPaginationState {
  page: number;
  length: number;
  search: string;
  setPage: (page: number) => void;
  setLength: (length: number) => void;
  setSearch: (search: string) => void;
}

export const useSearchPaginationStore = create<SearchPaginationState>((set) => ({
  page: 1,
  length: 10,
  search: '',
  setPage: (page) => set({ page }),
  setLength: (length) => set({ length }),
  setSearch: (search) => set({ search }),
}));
