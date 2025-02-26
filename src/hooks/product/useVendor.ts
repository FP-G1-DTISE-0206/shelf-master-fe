"use client";
import { PaginationResponse, PaginationRequest } from "@/types/pagination";
import { VendorResponse } from "@/types/vendor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchVendor = async (
  accessToken: string,
  params: PaginationRequest
): Promise<PaginationResponse<VendorResponse>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/vendor`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as PaginationResponse<VendorResponse>;
};

const useVendor = (accessToken: string) => {
  const [params, setParams] = useState<PaginationRequest>({
    start: 0,
    length: 10,
    search: "",
    field: "id",
    order: "asc",
  });
  const {
    isLoading,
    error,
    data: vendors,
    refetch,
  } = useQuery({
    queryKey: ["fetchVendor", accessToken, params],
    queryFn: async () => fetchVendor(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    vendors,
    refetch,
    params,
    setParams,
  };
};

export default useVendor;
