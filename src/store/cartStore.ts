import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  description: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  getTotalItems: () => number;
  clearCart: () => void;
}

const cartStore = createStore(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],

      addToCart: (item: CartItem) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItemIndex > -1) {
            const updatedCart = [...state.cartItems];
            updatedCart[existingItemIndex].quantity += item.quantity;
            return { cartItems: updatedCart };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        });
      },

      getTotalItems: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // Key for persisting cart data
    }
  )
);

export default cartStore;
