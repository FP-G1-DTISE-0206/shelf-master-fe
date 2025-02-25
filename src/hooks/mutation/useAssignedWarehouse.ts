"use client";
import { AssignedWarehouse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchAssignedWarehouse = async (
  accessToken: string,
  search: string
): Promise<AssignedWarehouse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/warehouse-list`
    + `?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as AssignedWarehouse[];
};

const useAssignedWarehouse = (accessToken: string) => {
  const [search, setSearch] = useState<string>("");
  const {
    isLoading,
    error,
    data: warehouses,
    refetch,
  } = useQuery({
    queryKey: ["fetchAssignedWarehouse", accessToken, search],
    queryFn: async () => fetchAssignedWarehouse(accessToken, search),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    warehouses,
    refetch,
    search,
    setSearch
  };
};

export default useAssignedWarehouse;