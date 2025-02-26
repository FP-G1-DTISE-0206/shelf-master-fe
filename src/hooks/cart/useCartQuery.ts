import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CartItem } from "@/types/cart";

const API_URL = "/api/v1/cart";

const fetchCart = async (userId: number): Promise<{ cartItems: CartItem[] }> => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const useCartQuery = (userId: number) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
};
