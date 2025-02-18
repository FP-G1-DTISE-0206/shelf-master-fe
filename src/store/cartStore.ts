import { create } from "zustand";
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
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
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

      removeFromCart: (id: number) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: number, quantity: number) => {
        set((state) => {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }, false);
      },
      

      getTotalItems: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),

      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
