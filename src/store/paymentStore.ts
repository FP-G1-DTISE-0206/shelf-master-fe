import { create } from "zustand";
import { persist } from "zustand/middleware";

type PaymentState = {
  choosenPaymentMethod: number | null;
  setChoosenPaymentMethod: (id: number) => void;
};

export const usePaymentStore = create(
  persist<PaymentState>(
    (set) => ({
      choosenPaymentMethod: null, // Default to null
      setChoosenPaymentMethod: (id) => set({ choosenPaymentMethod: id }),
    }),
    {
      name: "payment-storage", // Persist payment method to localStorage
    }
  )
);



// import { create } from "zustand";

// interface PaymentState {
//   snapToken: string | null;
//   setSnapToken: (token: string) => void;
//   // clearSnapToken: () => void;
// }

// export const usePaymentStore = create<PaymentState>((set) => ({
//   snapToken: null,

//   setSnapToken: (token) => set({ snapToken: token}),

//   // clearSnapToken: () => set({ snapToken: null})
// }));