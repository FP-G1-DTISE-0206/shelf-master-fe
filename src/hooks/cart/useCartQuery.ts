import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CartItem } from "@/types/cart";

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
const fetchCart = async (token: string, userId: number): Promise<{ cartItems: CartItem[] }> => {
  const response = await axios.get(`${API_URL}/cart/${userId}`, getAuthHeaders(token));
  return response.data;
};

export const useCartQuery = (token: string, userId: number) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(token, userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
};
