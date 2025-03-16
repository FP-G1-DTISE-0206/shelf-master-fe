import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShippingState = {
  choosenShippingCost: number;
  choosenCourierId: string | null;
  setChoosenShippingCost: (cost: number) => void;
  setChoosenCourierId: (id: string) => void;
};

export const useShippingStore = create(
  persist<ShippingState>(
    (set) => ({
      choosenShippingCost: 0, // Default shipping cost
      choosenCourierId: null, // Default courier ID
      setChoosenShippingCost: (cost) => set({ choosenShippingCost: cost }),
      setChoosenCourierId: (id) => set({ choosenCourierId: id }),
    }),
    {
      name: "shipping-storage", // Key for localStorage
    }
  )
);
