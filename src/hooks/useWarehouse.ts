"use client";
import {
  WarehousePaginationResponse,
  WarehouseRequest,
} from "@/types/warehouse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchWarehouses = async (
  accessToken: string,
  params: WarehouseRequest
): Promise<WarehousePaginationResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as WarehousePaginationResponse;
};

const useWarehouses = (accessToken: string) => {
  const [params, setParams] = useState<WarehouseRequest>({
    start: 0,
    length: 10,
    search: "",
    field: "id",
    order: "desc",
  });
  const {
    isLoading,
    error,
    data: warehouses,
    refetch,
  } = useQuery({
    queryKey: ["fetchWarehouses", accessToken, params],
    queryFn: async () => fetchWarehouses(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    warehouses,
    refetch,
    params,
    setParams,
  };
};
export default useWarehouses;
