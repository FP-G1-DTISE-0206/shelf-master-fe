import axios from "axios";
import { CartItem } from "@/types/cart";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`;


const getAuthHeaders = (token: string | undefined) => {
  if(!token) throw new Error("User is not authenticated");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  };
};


export const getCart = async (token: string): Promise<{ cartItems: CartItem[]; totalQuantity: number; totalPrice: number; }> => {
  const response = await axios.get(`${API_URL}`, getAuthHeaders(token));
  return response.data.data;
};

export const addToCart = async (
  token: string,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await axios.post(API_URL, { productId, quantity }, getAuthHeaders(token));
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

export const removeCartItem = async (token: string, cartId: number) => {
  await axios.delete(`${API_URL}/${cartId}`, getAuthHeaders(token));
};
