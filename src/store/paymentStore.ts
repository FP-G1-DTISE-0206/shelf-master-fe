import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaymentState {
  snapToken: string | null;
  isSnapEmbedded: boolean;
  setSnapToken: (token: string) => void;
  setSnapEmbedded: (status: boolean) => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      snapToken: null,
      isSnapEmbedded: false,
      setSnapToken: (token) => set({ snapToken: token }),
      setSnapEmbedded: (isEmbedded) => set({ isSnapEmbedded: isEmbedded }),
    }),
    { name: "payment-store" }
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