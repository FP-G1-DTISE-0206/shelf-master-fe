"use client";
import { AssignedWarehouse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchAssignedWarehouse = async (
  accessToken: string
): Promise<AssignedWarehouse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/warehouse-list`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as AssignedWarehouse[];
};

const useAssignedWarehouse = (accessToken: string) => {
  const [search, setSearch] = useState<{search: ""}>({
    search: "",
  });
  const {
    isLoading,
    error,
    data: warehouses,
    refetch,
  } = useQuery({
    queryKey: ["fetchAssignedWarehouse", accessToken],
    queryFn: async () => fetchAssignedWarehouse(accessToken),
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