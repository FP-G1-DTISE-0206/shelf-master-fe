import { create } from "zustand";
import { persist } from "zustand/middleware";

type WarehouseState = {
  warehouseId: number | null;
  setWarehouseId: (id: number) => void;
};

export const useWarehouseStore = create(
  persist<WarehouseState>(
    (set) => ({
      warehouseId: null, // Default value
      setWarehouseId: (id) => set({ warehouseId: id }),
    }),
    {
      name: "warehouse-storage", // Key for localStorage
    }
  )
);
