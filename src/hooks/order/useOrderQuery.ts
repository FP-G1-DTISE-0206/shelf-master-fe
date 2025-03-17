import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OrderResponse } from "@/types/order";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`;

const fetchOrders = async (token: string, start = 0, length = 10): Promise<OrderResponse[]> => {
  const response = await axios.get<{ data: { data: OrderResponse[] } }>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { start, length },
  });

  console.log("Orders Retrieved:", response.data.data.data);

  return response.data.data.data
};

export const useOrderQuery = (token: string, start = 0, length = 10) => 
  useQuery({
    queryKey: ["orders", start, length],
    queryFn: () => fetchOrders(token, start, length),
    enabled: !!token,
  });