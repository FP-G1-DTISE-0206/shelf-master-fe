"use client";
import { PaginationRequest, PaginationResponse } from "@/types/pagination";
import { WarehouseFullResponse, WarehouseResponse } from "@/types/warehouse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchWarehouses = async (
  accessToken: string,
  params: PaginationRequest
): Promise<PaginationResponse<WarehouseResponse>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as PaginationResponse<WarehouseResponse>;
};

const useWarehouses = (accessToken: string) => {
  const [params, setParams] = useState<PaginationRequest>({
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

const findClosestWarehouse = async (
  accessToken: string,
  userAddressId: number
): Promise<WarehouseFullResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse/find-closest`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        userAddressId: userAddressId,
      },
    }
  );
  return data.data as WarehouseFullResponse;
};

export const useFindClosest = (accessToken: string) => {
  const [userAddressId, setUserAddressId] = useState(0);
  const isRequestValid = Boolean(userAddressId);
  const {
    isLoading,
    error,
    data: closestWarehouse,
    refetch,
  } = useQuery({
    queryKey: ["fetchSingleUserAddress", accessToken, userAddressId],
    queryFn: async () => findClosestWarehouse(accessToken, userAddressId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
    enabled: isRequestValid,
  });
  return {
    isLoading,
    error,
    closestWarehouse,
    refetch,
    userAddressId,
    setUserAddressId,
  };
};

export default useWarehouses;
