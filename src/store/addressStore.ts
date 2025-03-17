import { create } from "zustand";
import { persist } from "zustand/middleware";

type AddressState = {
  addressId: number | null;
  setAddressId: (id: number) => void;
};

export const useAddressStore = create(
  persist<AddressState>(
    (set) => ({
      addressId: null, // Default value is null
      setAddressId: (id) => set({ addressId: id }),
    }),
    {
      name: "address-storage", // Key for localStorage
    }
  )
);
