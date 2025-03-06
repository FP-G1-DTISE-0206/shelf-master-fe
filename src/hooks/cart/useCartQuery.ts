import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "./cartService";
import { useEffect } from "react";

export const useCartQuery = (token: string) => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!token) {
        return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
      }
      const data = await getCart(token);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (cartQuery.data) {
      queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    }
  }, [cartQuery.data, queryClient]);

  return cartQuery;
};

export const useCartMutations = (token: string, userId: number) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      addToCart(token, data.productId, data.quantity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { cartId: number; quantity: number }) =>
      updateCartItem(token, data.cartId, data.quantity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartId: number) =>
      removeCartItem(token, cartId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"], exact: false });
    },
  });

  return { addMutation, updateMutation, removeMutation };
};
