import { create } from "zustand";
import { CartItem } from "@/types/cart";

type CartState = {
  cartItems: CartItem[];
  totalItems: number;
  setCart: (cartItems: CartItem[]) => void;
  addToCartLocal: (item: CartItem) => void;
  updateCartItem: (cartId: number, quantity: number) => void;
  removeCartItem: (cartId: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  totalItems: 0,

  setCart: (cartItems) => set({ cartItems, totalItems: cartItems.length }),

  addToCartLocal: (item: CartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
          totalItems: state.totalItems,
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
          totalItems: state.totalItems + 1,
        };
      }
    }),

  updateCartItem: (cartId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      ),
    })),


  removeCartItem: (cartId: number) =>
    set((state) => {
      if (!state.cartItems.some((item) => item.cartId === cartId)) {
        return state; 
      }

      const filteredCart = state.cartItems.filter(
        (item) => item.cartId !== cartId
      );
      return {
        cartItems: filteredCart,
        totalItems: filteredCart.length,
      };
    }),
}));
