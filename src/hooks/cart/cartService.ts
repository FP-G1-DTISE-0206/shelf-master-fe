import axios from "axios";
import { CartItem } from "@/types/cart";

const API_URL = "http://localhost:8080/api/v1/cart";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/cart";

const getAuthHeaders = (token: string | undefined) => {
  if(!token) throw new Error("User is not authenticated");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  };
};

export const getCart = async (userId: number): Promise<{ cartItems: CartItem[] }> => {
  const response = await axios.get(`${API_URL}/${userId}`);
  // const response = await axios.get(`http://localhost:8080/api/v1/cart/${userId}`);
  return response.data;
};

export const addToCart = async (
  token: string,
  userId: number,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await axios.post(API_URL, { userId, productId, quantity }, getAuthHeaders(token));
  return response.data;
};

export const updateCartItem = async (
  cartId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await axios.put(`${API_URL}/${cartId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (userId: number, cartId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${userId}/${cartId}`);
};
