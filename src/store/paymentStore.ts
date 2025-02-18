import { create } from "zustand";

interface PaymentState {
  snapToken: string | null;
  isSnapEmbedded: boolean;
  setSnapToken: (token: string) => void;
  setSnapEmbedded: (status: boolean) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  snapToken: null,
  isSnapEmbedded: false,
  setSnapToken: (token) => set({ snapToken: token, isSnapEmbedded: false }), // Reset embed state when token changes
  setSnapEmbedded: (status) => set({ isSnapEmbedded: status }),
}));


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