import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { OrderRequest, OrderResponse } from "@/types/order";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`;

const createOrder = async (token: string, orderData: OrderRequest): Promise<OrderResponse> => {
  console.log("Sending Order Request:", orderData);
  const response = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log("Order Created Successfully:", response.data);
  return response.data;
};

export const useOrderMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: OrderRequest) => createOrder(token, orderData),
    onSuccess: (data) => {
      console.log("Order Created:", data);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Order Creation Failed:", error);
    },
  });
};
