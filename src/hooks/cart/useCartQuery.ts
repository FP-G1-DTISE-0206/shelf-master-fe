import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CartItem } from "@/types/cart";
import { getCart, addToCart, updateCartItem, removeCartItem } from "./cartService";
import { useEffect } from "react";

const API_URL = "http://localhost:8080/api/v1"


const getAuthHeaders = (token: string | undefined) => {
  if (!token) throw new Error("User is not authenticated");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};
const fetchCart = async (
  token: string, 
  userId: number
): Promise<{ 
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}> => {
  const response = await axios.get(`${API_URL}/cart/${userId}`, getAuthHeaders(token));
  return response.data;
};

export const useCartQuery = (token: string, userId: number) => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!token || userId === 0) {
        console.warn("No token or userId provided. Skipping cart fetch.");
        return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
      }
      const data = await getCart(token, userId);
      console.log("Cart Data Fetched:", data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (cartQuery.data) {
      console.log("Cart Updated:", cartQuery.data);
      queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    }
  }, [cartQuery.data, queryClient]);

  return cartQuery;
};


export const useCartMutations = (token: string, userId: number) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      addToCart(token, userId, data.productId, data.quantity),
    onSuccess: async () => {
      console.log("Cart item added, refreshing cart...");
      await queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { cartId: number; quantity: number }) =>
      updateCartItem(token, data.cartId, data.quantity),
    onSuccess: async () => {
      console.log("Cart item updated, refreshing cart...");
      await queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartId: number) => removeCartItem(token, userId.toString(), cartId),
    onSuccess: async () => {
      console.log("Cart item removed, refreshing cart...");
      await queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    },
  });

  return { addMutation, updateMutation, removeMutation };
};