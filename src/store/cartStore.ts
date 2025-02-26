import { create } from "zustand";
import { CartItem } from "@/types/cart";

type CartState = {
  cartItems: CartItem[];
  totalItems: number;
  setCart: (cartItems: CartItem[]) => void;
  updateCartItem: (cartId: number, quantity: number) => void;
  removeCartItem: (cartId: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  totalItems: 0,

  setCart: (cartItems) => set({ cartItems, totalItems: cartItems.length }),

  updateCartItem: (cartId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      ),
    })),

  removeCartItem: (cartId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.cartId !== cartId),
      totalItems: state.cartItems.length - 1,
    })),
}));
