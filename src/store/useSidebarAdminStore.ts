import { create } from "zustand";

export interface SidebarAdminState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSidebarAdminStore = create<SidebarAdminState>((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
