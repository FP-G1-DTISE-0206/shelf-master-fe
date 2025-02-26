import axios from "axios";
import { CartItem } from "@/types/cart";

const API_URL = "/api/v1/cart";

export const getCart = async (userId: number): Promise<{ cartItems: CartItem[] }> => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await axios.post(API_URL, { userId, productId, quantity });
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
