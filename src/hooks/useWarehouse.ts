"use client";
import {
  WarehouseFullResponse,
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

const fetchSingleWarehouse = async (
  accessToken: string,
  id: number
): Promise<WarehouseFullResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as WarehouseFullResponse;
};

export const useSingleWarehouse = (accessToken: string, id: number) => {
  const {
    isLoading,
    error,
    data: singleWarehouse,
    refetch,
  } = useQuery({
    queryKey: ["fetchSingleUserAddress", accessToken, id],
    queryFn: async () => fetchSingleWarehouse(accessToken, id),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    singleWarehouse,
    refetch,
  };
};

export default useWarehouses;
