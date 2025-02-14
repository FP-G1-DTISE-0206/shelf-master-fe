import { create } from "zustand";

interface PaymentState {
  snapToken: string | null;
  setSnapToken: (token: string) => void;
  // clearSnapToken: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  snapToken: null,

  setSnapToken: (token) => set({ snapToken: token}),

  // clearSnapToken: () => set({ snapToken: null})
}));