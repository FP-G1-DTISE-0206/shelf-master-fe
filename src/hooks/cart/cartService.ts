import axios from "axios";
import { CartItem } from "@/types/cart";

const API_URL = "http://localhost:8080/api/v1/cart";

const getAuthHeaders = (token: string | undefined) => {
  if(!token) throw new Error("User is not authenticated");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  };
};


export const getCart = async (token: string, userId: number): Promise<{ cartItems: CartItem[]; totalQuantity: number; totalPrice: number; }> => {
  const response = await axios.get(`${API_URL}/${userId}`, getAuthHeaders(token));
  console.log("Cart API Response: ", response.data.data);
  return response.data.data;
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
  token: string,
  cartId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await axios.put(`${API_URL}/${cartId}`, { quantity }, getAuthHeaders(token));
  return response.data;
};

export const removeCartItem = async (token: string, userId: string, cartId: number) => {
  await axios.delete(`${API_URL}/${userId}/${cartId}`, getAuthHeaders(token));
};
