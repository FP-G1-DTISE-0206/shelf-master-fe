import { create } from "zustand";
import { UpdateCategoryRequest } from "@/types/category";

export interface SidebarAdminState {
  isOpen: boolean;
  page: string;
  isModalCategoryOpen: boolean;
  modalCategoryType: string;
  category: UpdateCategoryRequest;
  setIsOpen: (isOpen: boolean) => void;
  setPage: (page: string) => void;
  setIsModalCategoryOpen: (isModalCategoryOpen: boolean) => void;
  setModalCategoryType: (page: string) => void;
  setCategory: (category: UpdateCategoryRequest) => void;
}

export const useSidebarAdminStore = create<SidebarAdminState>((set) => ({
  isOpen: false,
  page: "dashboard",
  isModalCategoryOpen: false,
  modalCategoryType: "create",
  category: {} as UpdateCategoryRequest,
  setIsOpen: (isOpen) => set({ isOpen }),
  setPage: (page) => set({ page }),
  setIsModalCategoryOpen: (isModalCategoryOpen) => set({ isModalCategoryOpen }),
  setModalCategoryType: (modalCategoryType) => set({ modalCategoryType }),
  setCategory: (category) => set({ category }),
}));
